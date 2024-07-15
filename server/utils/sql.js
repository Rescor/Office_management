export const getAllRequests = `
  SELECT 
      requests.id,
      employees.name AS employee_name,
      absence_reasons.reason,
      DATE_FORMAT(requests.start_date, '%d.%m.%Y') AS start_date,
      DATE_FORMAT(requests.end_date, '%d.%m.%Y') AS end_date,
      requests.comment,
      request_statuses.status
  FROM 
      leave_requests requests 
  INNER JOIN 
       employees ON requests.employee_id = employees.id
  INNER JOIN 
      absence_reasons ON requests.reason_id = absence_reasons.id
  INNER JOIN 
      request_statuses ON requests.status_id = request_statuses.id
  ORDER BY 
      requests.id;
`

export const getApprovalRequests = `
  SELECT
      ar.id,
      approvers.name AS approver_name,
      lr.id AS request_id,
      employees.name AS employee_name,
      reasons.reason AS reason,
      DATE_FORMAT(lr.start_date, '%d.%m.%Y') AS start_date,
      DATE_FORMAT(lr.end_date, '%d.%m.%Y') AS end_date,
      statuses.status,
      lr.comment,
      ar.comment AS hr_comment
  FROM
      approval_requests ar
  JOIN
      leave_requests lr ON ar.request_id = lr.id
  JOIN
      employees approvers ON ar.approver_id = approvers.id
  JOIN
      employees ON lr.employee_id = employees.id
  JOIN
      absence_reasons reasons ON lr.reason_id = reasons.id
  JOIN
      request_statuses statuses ON lr.status_id = statuses.id
  ORDER BY 
      ar.id;
`

export const getUserRequests = `
  SELECT 
      requests.id,
      absence_reasons.reason,
      DATE_FORMAT(requests.start_date, '%d.%m.%Y') AS start_date,
      DATE_FORMAT(requests.end_date, '%d.%m.%Y') AS end_date,
      requests.comment,
      request_statuses.status
  FROM 
      leave_requests requests 
  INNER JOIN 
      absence_reasons ON requests.reason_id = absence_reasons.id
  INNER JOIN 
      request_statuses ON requests.status_id = request_statuses.id
  WHERE 
      requests.employee_id = ?
  ORDER BY 
      requests.id;
`

export const getRequest = `
  SELECT 
      requests.id,
      employees.name,
      DATE_FORMAT(requests.start_date, '%Y-%m-%d') AS start_date,
      DATE_FORMAT(requests.end_date, '%Y-%m-%d') AS end_date,
      requests.reason_id,
      requests.comment,
      requests.status_id,
      request_statuses.status
  FROM 
      leave_requests requests 
  INNER JOIN 
      request_statuses ON requests.status_id = request_statuses.id
  INNER JOIN 
      employees ON requests.employee_id = employees.id
  WHERE 
      requests.id = ?;
`

export const editRequest = `
  UPDATE 
      leave_requests 
  SET 
      start_date = ?,
      end_date = ?,
      status_id = ?,
      reason_id = ?,
      comment = ?
  WHERE 
      id = ?;
`

export const updateRequestStatus = `
  UPDATE 
      leave_requests 
  SET 
      status_id = ?
  WHERE 
      id = ?;
`

export const getLeaveRequests = `
  SELECT 
      requests.id,
      employees.name,
      absence_reasons.reason,
      DATE_FORMAT(requests.start_date, '%d.%m.%Y') AS start_date,
      DATE_FORMAT(requests.end_date, '%d.%m.%Y') AS end_date,
      requests.comment
  FROM 
      leave_requests requests 
  INNER JOIN 
      employees ON requests.employee_id = employees.id
  INNER JOIN 
      absence_reasons ON requests.reason_id = absence_reasons.id
  INNER JOIN 
      request_statuses ON requests.status_id = request_statuses.id
  WHERE 
      requests.status_id = ?
  ORDER BY 
      requests.id;
`

export const createNewRequest = `
  INSERT INTO leave_requests (
      employee_id,
      reason_id,
      start_date,
      end_date,
      comment,
      status_id
    ) VALUES (?, ?, ?, ?, ?, ?)
`

export const createApprovalRequest = `
  INSERT INTO approval_requests (
      approver_id, 
      request_id, 
      comment
  ) VALUES (?, ?, ?);
`

export const getRequestReasons = `SELECT * FROM absence_reasons;`

export const getSubdivisions = `SELECT * FROM subdivisions;`

export const getEmployeeStatuses = `SELECT * FROM employee_statuses;`

export const getPositions = `SELECT * FROM positions;`

export const getProjectStatuses = `SELECT * FROM project_statuses;`

export const getProjectTypes = `SELECT * FROM project_types;`

export const getAllProjects = `
  SELECT
      projects.id AS project_id,
      project_types.type AS project_type,
      DATE_FORMAT(projects.start_date, '%Y-%m-%d') AS start_date,
      DATE_FORMAT(projects.end_date, '%Y-%m-%d') AS end_date,
      managers.name AS manager,
      projects.comment,
      project_statuses.status AS project_status
  FROM 
      projects
  INNER JOIN 
      project_types ON projects.type_id = project_types.id
  INNER JOIN 
      employees AS managers ON projects.manager_id = managers.id
  INNER JOIN 
      project_statuses ON projects.status_id = project_statuses.id
  ORDER BY 
      projects.id;
`

export const createNewProject = `
  INSERT INTO projects (
      type_id,
      start_date,
      end_date,
      manager_id,
      comment,
      status_id
    ) VALUES (?, ?, ?, ?, ?, ?);
`

export const getUserProjects = `
  SELECT
      projects.id AS project_id,
      project_types.type AS project_type,
      DATE_FORMAT(projects.start_date, '%Y-%m-%d') AS start_date,
      DATE_FORMAT(projects.end_date, '%Y-%m-%d') AS end_date,
      managers.name AS manager,
      projects.comment,
      project_statuses.status AS project_status
  FROM 
      employee_projects
  INNER JOIN 
      projects ON employee_projects.project_id = projects.id
  INNER JOIN 
      project_types ON projects.type_id = project_types.id
  INNER JOIN 
      employees AS managers ON projects.manager_id = managers.id
  INNER JOIN 
      project_statuses ON projects.status_id = project_statuses.id
  WHERE 
      employee_projects.employee_id = ?
  ORDER BY 
      projects.id;
`

export const getAllEmployees = `
    SELECT 
        employees.id,
        employees.name,
        subdivisions.name AS subdivision,
        positions.name AS position,
        employee_statuses.status,
        employees.absence_balance,
        partners.name AS partner
    FROM 
        employees
    INNER JOIN 
        subdivisions ON employees.subdivision_id = subdivisions.id
    INNER JOIN 
        employee_statuses ON employees.status_id = employee_statuses.id
    INNER JOIN 
        positions ON employees.position_id = positions.id
    LEFT JOIN 
        employees partners ON employees.partner_id = partners.id
    ORDER BY 
        employees.id;
`

export const getPartners = `
    SELECT 
        employees.id,
        employees.name
    FROM 
        employees
    WHERE
        employees.position_id = ?
    ORDER BY 
        employees.id;
`

export const createNewEmployee = `
  INSERT INTO employees (
      name,
      subdivision_id,
      position_id,
      status_id,
      partner_id,
      absence_balance
    ) VALUES (?, ?, ?, ?, ?, ?)
`

export const getEmployee = `SELECT * FROM employees WHERE employees.id = ?;`

export const editEmployee = `
  UPDATE 
      employees 
  SET 
      name = ?,
      subdivision_id = ?,
      position_id = ?,
      status_id = ?,
      partner_id = ?,
      absence_balance = ?
  WHERE 
      id = ?;
`

export const getProjectEmployees = `
    SELECT 
        employees.id,
        employees.name,
        subdivisions.name AS subdivision,
        positions.name AS position,
        employee_statuses.status,
        employees.absence_balance,
        partners.name AS partner
    FROM 
        employees
    INNER JOIN 
        subdivisions ON employees.subdivision_id = subdivisions.id
    INNER JOIN 
        employee_statuses ON employees.status_id = employee_statuses.id
    INNER JOIN 
        positions ON employees.position_id = positions.id
    LEFT JOIN 
        employees partners ON employees.partner_id = partners.id
    INNER JOIN 
        employee_projects ON employees.id = employee_projects.employee_id
    WHERE 
        employee_projects.project_id = ?
    ORDER BY 
        employees.id;
`

export const removeEmployeeFromProject = `
  DELETE FROM employee_projects WHERE employee_id = ? AND project_id = ?;
`

export const addEmployeeToProject = `
  INSERT INTO employee_projects (
      employee_id,
      project_id
    ) VALUES (?, ?);
`
export const getLeaveDates = `SELECT start_date, end_date, employee_id FROM leave_requests WHERE id = ?;`

export const updateAbsBalance = `UPDATE employees SET absence_balance = absence_balance - ? WHERE id = ?;`
