import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from '@mui/material';
import { getAbsReasons, getRequestData, approveRequest, rejectRequest } from '../../utils/http';
import ListLoader from '../ListLoader';
import Success from '../Success/Success';
import BackButton from '../BackButton';
import styles from './Form.module.css';

export default function LeaveRequestForm() {
  const params = useParams();
  const approverId = localStorage.getItem('user_id');

  const [reasons, setReasons] = useState(undefined);
  const [request, setRequest] = useState(undefined);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(undefined);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setRequest((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    async function fetchData() {
      const reasons = await getAbsReasons();
      const requestData = await getRequestData(params.id);
      setReasons(reasons);
      setRequest(requestData[0]);
    }

    fetchData();
  }, [params.id]);

  useEffect(() => {
    const x = setTimeout(() => setIsError(false), 1250);
    return () => clearTimeout(x)
  }, [isError]);

  async function handleReq(action) {
    const req = request;

    if (action === 'approve') {
      req.status_id = 2;
      req.approver_id = approverId;
      const resp = await approveRequest(req);
      if (resp.success) setIsSuccess(true);
    }

    if (action === 'reject') {
      req.status_id = 3;
      const resp = await rejectRequest(req);
      if (resp.success) setIsSuccess(true);
    }
  }

  if (isSuccess) return <Success path='/lists/requests/leave' name={'leave requests'}/>;

  return <>
    <BackButton path='./../../' />
    <h2>{`Request #${params.id}`}</h2>

    {(reasons && request) ? <form className={styles.form}>
      <TextField
        id="employee_name"
        name="employee_name"
        label="Employee"
        variant="outlined"
        value={request.employee_name}
        margin="normal"
        disabled={true}
        style={{marginRight: '10px'}}
      />

      <FormControl sx={{width: '200px'}} variant="outlined" margin="normal">
        <InputLabel id="reason-label">Reason</InputLabel>
        <Select
          labelId="reason-label"
          id="reason_id"
          name="reason_id"
          value={request.reason_id}
          onChange={handleChange}
          label="Reason"
          disabled={true}
        >
          {reasons.map(reason => <MenuItem value={reason.id.toString()} key={reason.id}>{reason.reason}</MenuItem>)}
        </Select>
      </FormControl>

      <div>
        <TextField
          id="start_date"
          name="start_date"
          label="Start Date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          type="date"
          disabled={true}
          value={request.start}
          onChange={handleChange}
          margin="normal"
          style={{marginRight: '10px'}}
        />

        <TextField
          id="end_date"
          name="end_date"
          label="End Date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          type="date"
          disabled={true}
          value={request.end}
          onChange={handleChange}
          margin="normal"
        />
      </div>

      <div>
        <span>Employee comment:</span>
        <TextareaAutosize
          id="comment"
          name="comment"
          aria-label="comment"
          disabled={true}
          minRows={3}
          value={request.comment}
          onChange={handleChange}
          style={{width: '90%', marginTop: '16px', resize: 'vertical'}}
        />
      </div>

      <div>
        <span>Your comment:</span>
        <TextareaAutosize
          id="hr_comment"
          name="hr_comment"
          aria-label="hr_comment"
          minRows={3}
          value={request.hr_comment}
          onChange={handleChange}
          style={{width: '90%', marginTop: '16px', resize: 'vertical'}}
        />
      </div>

      <>
        <Button onClick={() => handleReq('approve')} variant="contained" color="primary" style={{ marginTop: '16px', marginRight: '16px' }}>
          Approve
        </Button>
        <Button onClick={() => handleReq('reject')} variant="contained" color="primary" style={{ marginTop: '16px', marginRight: '16px' }}>
          Reject
        </Button>
      </>
    </form> : <ListLoader/>}
  </>
};
