const SERVER_ADDR = 'http://127.0.0.1:3001'

export async function getLeaveRequests() {
  const req = await fetch(`${SERVER_ADDR}/requests/leave`)
  return await req.json();
}

export async function getAllRequests() {
  const req = await fetch(`${SERVER_ADDR}/requests/all`)
  return await req.json();
}

export async function getApprovalRequests() {
  const req = await fetch(`${SERVER_ADDR}/requests/approval`)
  return await req.json();
}

export async function getMyRequestsData(id) {
  const req = await fetch(`${SERVER_ADDR}/requests/user/${id}`)
  return await req.json();
}

export async function getAbsReasons() {
  const req = await fetch(`${SERVER_ADDR}/requests/reasons`)
  return await req.json();
}

export async function createNewRequest(request) {
  try {
    const response = await fetch(`${SERVER_ADDR}/requests/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) throw new Error('Failed to create the new request');
    return await response.json();
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

export async function getMyProjects(id) {
  const req = await fetch(`${SERVER_ADDR}/projects/user/${id}`)
  return await req.json();
}

export async function getAllProjects() {
  const req = await fetch(`${SERVER_ADDR}/projects/all`)
  return await req.json();
}

export async function getProjectEmployees(id) {
  const req = await fetch(`${SERVER_ADDR}/projects/${id}/employees`)
  return await req.json();
}

export async function addEmployeeToProject(id, data) {
  try {
    const response = await fetch(`${SERVER_ADDR}/projects/${id}/employees/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error('Failed to add employee to the project');
    return await response.json();
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

export async function removeEmployeeFromProject(id, data) {
  try {
    const response = await fetch(`${SERVER_ADDR}/projects/${id}/employees/remove`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error('Failed to remove employee from the project');
    return await response.json();
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

export async function getProjectTypes() {
  const req = await fetch(`${SERVER_ADDR}/projects/types`)
  return await req.json();
}

export async function getProjectStatuses() {
  const req = await fetch(`${SERVER_ADDR}/projects/statuses`)
  return await req.json();
}

export async function createNewProject(project) {
  try {
    const response = await fetch(`${SERVER_ADDR}/projects/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    });

    if (!response.ok) throw new Error('Failed to create the new project');
    return await response.json();
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

export async function getRequestData(id) {
  const req = await fetch(`${SERVER_ADDR}/requests/${id}`)
  return await req.json();
}

export async function editRequest(request) {
  try {
    const response = await fetch(`${SERVER_ADDR}/requests/${request.id}/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) throw new Error('Failed to edit the request');
    return await response.json();
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

export async function approveRequest(request) {
  try {
    const response = await fetch(`${SERVER_ADDR}/requests/${request.id}/handle/approve`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) throw new Error('Failed to handle the request');
    return await response.json();
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

export async function rejectRequest(request) {
  try {
    const response = await fetch(`${SERVER_ADDR}/requests/${request.id}/handle/reject`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) throw new Error('Failed to handle the request');
    return await response.json();
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

export async function getAllEmployees() {
  const req = await fetch(`${SERVER_ADDR}/employees/all`)
  return await req.json();
}

export async function getSubdivisions() {
  const req = await fetch(`${SERVER_ADDR}/employees/subdivisions`)
  return await req.json();
}

export async function getEmployeeStatuses() {
  const req = await fetch(`${SERVER_ADDR}/employees/statuses`)
  return await req.json();
}

export async function getPartners() {
  const req = await fetch(`${SERVER_ADDR}/employees/partners`)
  return await req.json();
}

export async function getManagers() {
  const req = await fetch(`${SERVER_ADDR}/employees/managers`)
  return await req.json();
}

export async function getPositions() {
  const req = await fetch(`${SERVER_ADDR}/employees/positions`)
  return await req.json();
}

export async function createNewEmployee(employee) {
  try {
    const response = await fetch(`${SERVER_ADDR}/employees/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employee)
    });

    if (!response.ok) throw new Error('Failed to create the new employee');
    return await response.json();
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

export async function getEmployee(id) {
  const req = await fetch(`${SERVER_ADDR}/employees/${id}`)
  return await req.json();
}

export async function editEmployee(employee) {
  try {
    const response = await fetch(`${SERVER_ADDR}/employees/${employee.id}/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employee)
    });

    if (!response.ok) throw new Error('Failed to edit the employee');
    return await response.json();
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}
