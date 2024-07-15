import express from 'express';
import connection from "../db.js";
import {
  addEmployeeToProject, createNewProject,
  getAllProjects, getProjectEmployees,
  getProjectStatuses, getProjectTypes,
  getUserProjects, removeEmployeeFromProject
} from "../utils/sql.js";

const router = express.Router();
router.use(express.json());

router.get('/statuses', (req, res) => {
  connection.query(getProjectStatuses, (error, results) => {
    if (error) res.status(500).send(error.sqlMessage);
    else res.json(results);
  });
});

router.get('/types', (req, res) => {
  connection.query(getProjectTypes, (error, results) => {
    if (error) res.status(500).send(error.sqlMessage);
    else res.json(results);
  });
});

router.get('/all', (req, res) => {
  connection.query(getAllProjects, [], (error, results) => {
    if (error) res.status(500).send(error.sqlMessage);
    else {
      const projects = results.map(project => (
        {
          id: project.project_id,
          type: project.project_type,
          manager: project.manager,
          start: project.start_date,
          end: project.end_date,
          comment: project.comment,
          status: project.project_status,
        }
      ));

      res.json(projects);
    }
  });
});

router.get('/user/:id', (req, res) => {
  const userId = req.params.id;

  connection.query(getUserProjects, [userId], (error, results) => {
    if (error) res.status(500).send(error.sqlMessage);
    else {
      const projects = results.map(project => (
        {
          id: project.project_id,
          type: project.project_type,
          manager: project.manager,
          start: project.start_date,
          end: project.end_date,
          comment: project.comment,
          status: project.project_status,
        }
      ));

      res.json(projects);
    }
  });
});

router.get('/:id/employees', (req, res) => {
  const projectId = req.params.id;

  connection.query(getProjectEmployees, [projectId], (error, results) => {
    if (error) res.status(500).send(error.sqlMessage);
    else {
      const employees = results.map(employee => (
        {
          id: employee.id,
          name: employee.name,
          subdivision: employee.subdivision,
          position: employee.position,
          status: employee.status,
          partner: employee.partner,
          absence_balance: employee.absence_balance
        }
      ));

      res.json(employees);
    }
  });
});

router.post('/new', (req, res) => {
  const { type_id, start_date, end_date, manager_id, comment, status_id } = req.body;

  connection.query(createNewProject, [Number(type_id), start_date, end_date, Number(manager_id), comment, Number(status_id)], (error) => {
    if (error) res.status(500).send(error.sqlMessage);
    else res.status(201).json({ success: true, message: 'New project successfully created' });
  })
});

router.post('/:id/employees/add', (req, res) => {
  const projectId = req.params.id;
  const employeeId = req.body.employee_id;

  connection.query(addEmployeeToProject, [Number(employeeId), projectId], (error) => {
    if (error) res.status(500).send(error.sqlMessage);
    else res.status(201).json({ success: true, message: 'Employee successfully add to the project' });
  })
});

router.delete('/:id/employees/remove', (req, res) => {
  const projectId = req.params.id;
  const employeeId = req.body.id;

  connection.query(removeEmployeeFromProject, [Number(employeeId), projectId], (error) => {
    if (error) res.status(500).send(error.sqlMessage);
    else res.status(201).json({ success: true, message: 'Employee successfully remove from the project' });
  })
});

export default router;
