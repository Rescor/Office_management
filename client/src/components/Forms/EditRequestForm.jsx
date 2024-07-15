import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from '@mui/material';
import { editRequest, getAbsReasons, getRequestData } from '../../utils/http';
import ListLoader from '../ListLoader';
import Success from '../Success/Success';
import styles from './Form.module.css';

export default function EditRequestForm() {
  const params = useParams();
  const userRole = localStorage.getItem('role');

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

  async function handleSubmit(event) {
    event.preventDefault();
    const requiredFields = ['start', 'end', 'reason_id'];
    const isFormValid = requiredFields.every(field => request[field].toString().trim() !== '');

    const start = new Date(request.start);
    const end = new Date(request.end);
    const isDataIntervalValid = start <= end;

    if (isFormValid && isDataIntervalValid) {
      const resp = await editRequest(request);
      if (resp.success) setIsSuccess(true);
    } else setIsError(true)
  }

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
    const x = setTimeout(() => setIsError(false), 2500);
    return () => clearTimeout(x)
  }, [isError]);

  if (isSuccess) return <>
    <Success path={'/lists/requests/my'} name={'my requests'} />
  </>

  return <>
    <h2>{`Request #${params.id}`}</h2>
    {(reasons && request) ? <form onSubmit={handleSubmit} className={styles.form}>
      <TextField
        id="status"
        name="status"
        label="Status"
        variant="outlined"
        value={request.status}
        margin="normal"
        disabled={userRole !== 'hr' && userRole !== 'pm'}
      />

      <FormControl sx={ {width: '200px' }} variant="outlined" margin="normal">
        <InputLabel id="reason-label">Reason *</InputLabel>
        <Select
          labelId="reason-label"
          id="reason_id"
          name="reason_id"
          value={request.reason_id}
          onChange={handleChange}
          label="Reason"
          required={true}
        >
          {reasons.map(reason => <MenuItem value={reason.id.toString()} key={reason.id}>{reason.reason}</MenuItem>)}
        </Select>
      </FormControl>

      <div>
        <TextField
          id="start"
          name="start"
          label="Start Date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          type="date"
          required={true}
          value={request.start}
          onChange={handleChange}
          margin="normal"
          style={{marginRight: '10px'}}
        />

        <TextField
          id="end"
          name="end"
          label="End Date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          type="date"
          required={true}
          value={request.end}
          onChange={handleChange}
          margin="normal"
        />
      </div>

      <TextareaAutosize
        id="comment"
        name="comment"
        aria-label="comment"
        placeholder="Comment"
        minRows={3}
        value={request.comment}
        onChange={handleChange}
        style={{ width: '90%', marginTop: '16px', resize: 'vertical' }}
      />

      {isError ? <p>You have not filled in the required fields or enter incorrect date range</p> :
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Submit
        </Button>}
    </form> : <ListLoader />}
  </>
};
