import express from 'express';
import connection from "../db.js";
import {
  createNewEmployee, editEmployee,
  getAllEmployees, getEmployee,
  getEmployeeStatuses, getPartners,
  getPositions, getSubdivisions
} from "../utils/sql.js";

const router = express.Router();
router.use(express.json());

router.get('/all', (req, res) => {
  connection.query(getAllEmployees, [], (error, results) => {
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

router.get('/subdivisions', (req, res) => {
  connection.query(getSubdivisions, (error, results) => {
    if (error) res.status(500).send(error.sqlMessage);
    else res.json(results);
  });
});

router.get('/statuses', (req, res) => {
  connection.query(getEmployeeStatuses, (error, results) => {
    if (error) res.status(500).send(error.sqlMessage);
    else res.json(results);
  });
});

router.get('/partners', (req, res) => {
  const partnerPositionId = 2; // HR position id

  connection.query(getPartners, [partnerPositionId], (error, results) => {
    if (error) res.status(500).send(error.sqlMessage);
    else {
      const partners = results.map(employee => (
        {
          id: employee.id,
          name: employee.name
        }
      ));

      res.json(partners);
    }
  });
});

router.get('/managers', (req, res) => {
  const managerPositionId = 3; // PM position id

  connection.query(getPartners, [managerPositionId], (error, results) => {
    if (error) res.status(500).send(error.sqlMessage);
    else {
      const managers = results.map(employee => (
        {
          id: employee.id,
          name: employee.name
        }
      ));

      res.json(managers);
    }
  });
});

router.get('/positions', (req, res) => {
  connection.query(getPositions, (error, results) => {
    if (error) res.status(500).send(error.sqlMessage);
    else res.json(results);
  });
});

router.get('/:id', (req, res) => {
  const employeeId = req.params.id;

  connection.query(getEmployee, [employeeId], (error, results) => {
    if (error) res.status(500).send(error.sqlMessage);
    else res.json(results);
  });
});

router.post('/new', (req, res) => {
  const { name, partner_id, position_id, status_id, subdivision_id, absence_balance } = req.body;

  connection.query(createNewEmployee, [name, Number(subdivision_id), Number(position_id), Number(status_id), Number(partner_id), Number(absence_balance)], (error) => {
    if (error) res.status(500).send(error.sqlMessage);
    else res.status(201).json({ success: true, message: 'New employee successfully created' });
  });
});

router.put('/:id/edit', (req, res) => {
  const employeeId = req.params.id;
  const { name, partner_id, position_id, status_id, subdivision_id, absence_balance } = req.body;

  connection.query(editEmployee, [name, Number(subdivision_id), Number(position_id), Number(status_id), Number(partner_id), Number(absence_balance), employeeId], (error) => {
    if (error) res.status(500).send(error.sqlMessage);
    else res.status(200).json({ success: true, message: 'Employee successfully updated' });
  });
});

export default router;
