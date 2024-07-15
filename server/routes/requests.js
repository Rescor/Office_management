import express from 'express';
import connection from "../db.js";
import {
  getRequestReasons, getUserRequests,
  createNewRequest, getLeaveRequests,
  getRequest, editRequest,
  updateRequestStatus, createApprovalRequest,
  getAllRequests, getApprovalRequests, getLeaveDates, updateAbsBalance
} from "../utils/sql.js";

const router = express.Router();
router.use(express.json());

router.get('/reasons', (req, res) => {
  connection.query(getRequestReasons, (error, results) => {
    if (error) res.status(500).send(error.sqlMessage);
    else res.json(results);
  });
});

router.get('/leave', (req, res) => {
  const newReqStatusId = 1;

  connection.query(getLeaveRequests, [newReqStatusId], (error, results) => {
    if (error) res.status(500).send(error.sqlMessage);
    else {
      const requests = results.map(request => (
        {
          id: request.id,
          name: request.name,
          reason: request.reason,
          start: request.start_date,
          end: request.end_date,
          comment: request.comment
        }
      ));

      res.json(requests);
    }
  });
});

router.get('/approval', (req, res) => {
  connection.query(getApprovalRequests, (error, results) => {
    if (error) res.status(500).send(error.sqlMessage);
    else res.json(results);
  });
});

router.get('/all', (req, res) => {
  connection.query(getAllRequests, (error, results) => {
    if (error) res.status(500).send(error.sqlMessage);
    else {
      const requests = results.map(request => (
        {
          id: request.id,
          name: request.employee_name,
          reason: request.reason,
          start: request.start_date,
          end: request.end_date,
          comment: request.comment,
          status: request.status
        }
      ));

      res.json(requests);
    }
  });
});

router.get('/user/:id', (req, res) => {
  const userId = req.params.id;

  connection.query(getUserRequests, [userId], (error, results) => {
    if (error) res.status(500).send(error.sqlMessage);
    else {
      const requests = results.map(request => (
        {
          id: request.id,
          reason: request.reason,
          start: request.start_date,
          end: request.end_date,
          comment: request.comment,
          status: request.status
        }
      ));

      res.json(requests);
    }
  });
});

router.get('/:id', (req, res) => {
  const reqId = req.params.id;

  connection.query(getRequest, [reqId], (error, results) => {
    if (error) res.status(500).send(error.sqlMessage);
    else {
      const requests = results.map(request => {
        return {
          id: request.id,
          employee_name: request.name,
          reason_id: request.reason_id,
          start: request.start_date,
          end: request.end_date,
          comment: request.comment,
          status: request.status,
          status_id: request.status_id
        }
      });

      res.json(requests);
    }
  });
});

router.post('/new', (req, res) => {
  const { employee_id, start_date, end_date, reason_id, comment } = req.body;

  connection.query(createNewRequest, [Number(employee_id), Number(reason_id), start_date, end_date, comment, 1], (error) => {
    if (error) res.status(500).send(error.sqlMessage);
    else res.status(201).json({ success: true, message: 'New request successfully created' });
  })
});

router.put('/:id/edit', (req, res) => {
  const reqId = req.params.id;
  const { start, end, status_id, reason_id, comment } = req.body;

  connection.query(editRequest, [start, end, Number(status_id), Number(reason_id), comment, Number(reqId)], (error) => {
    if (error) res.status(500).send(error.sqlMessage);
    else res.status(200).json({ success: true, message: 'Request successfully updated' });
  });
});

router.put('/:id/handle/approve', (req, res) => {
  const reqId = req.params.id;
  const { status_id, approver_id, hr_comment: comment } = req.body;

  connection.getConnection((error, conn) => {
    if (error) return res.status(500).send(error.sqlMessage);

    conn.beginTransaction((error) => {
      if (error) {
        conn.release();
        return res.status(500).send(error.sqlMessage);
      }

      conn.query(getLeaveDates, [Number(reqId)], (error, results) => {
        if (error) {
          return conn.rollback(() => {
            conn.release();
            res.status(500).send(error.sqlMessage);
          });
        }

        const { start_date, end_date, employee_id } = results[0];
        const leaveDays = Math.ceil(Math.abs(new Date(end_date) - new Date(start_date)) / 86400000 + 1);

        conn.query(updateRequestStatus, [Number(status_id), Number(reqId)], (error) => {
          if (error) {
            return conn.rollback(() => {
              conn.release();
              res.status(500).send(error.sqlMessage);
            });
          }

          conn.query(createApprovalRequest, [Number(approver_id), Number(reqId), comment], (error) => {
            if (error) {
              return conn.rollback(() => {
                conn.release();
                res.status(500).send(error.sqlMessage);
              });
            }

            conn.query(updateAbsBalance, [leaveDays, employee_id], (error) => {
              if (error) {
                return conn.rollback(() => {
                  conn.release();
                  res.status(500).send(error.sqlMessage);
                });
              }

              conn.commit((error) => {
                if (error) {
                  return conn.rollback(() => {
                    conn.release();
                    res.status(500).send(error.sqlMessage);
                  });
                }

                conn.release();
                res.status(200).json({ success: true, message: 'Request approved' });
              });
            });
          });
        });
      });
    });
  });
});

router.put('/:id/handle/reject', (req, res) => {
  const reqId = req.params.id;
  const approver_id = 2;

  const { status_id, hr_comment: comment } = req.body;

  connection.getConnection((error, conn) => {
    if (error) return res.status(500).send(error.sqlMessage);

    conn.beginTransaction((error) => {
      if (error) {
        conn.release();
        return res.status(500).send(error.sqlMessage);
      }

      conn.query(updateRequestStatus, [Number(status_id), Number(reqId)], (error) => {
        if (error) {
          return conn.rollback(() => {
            conn.release();
            res.status(500).send(error.sqlMessage);
          });
        }

        conn.query(createApprovalRequest, [Number(approver_id), Number(reqId), comment], (error) => {
          if (error) {
            return conn.rollback(() => {
              conn.release();
              res.status(500).send(error.sqlMessage);
            });
          }

          conn.commit((error) => {
            if (error) {
              return conn.rollback(() => {
                conn.release();
                res.status(500).send(error.sqlMessage);
              });
            }

            conn.release();
            res.status(200).json({ success: true, message: 'Request rejected' });
          });
        });
      });
    });
  });
});

export default router;
