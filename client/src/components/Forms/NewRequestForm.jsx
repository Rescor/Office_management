import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from '@mui/material';
import { createNewRequest, getAbsReasons } from '../../utils/http';
import Success from '../Success/Success';
import BackButton from '../BackButton';
import styles from './Form.module.css';

export default function NewRequestForm() {
  const [absReasons, setAbsReasons] = useState(undefined);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(undefined);
  const [formData, setFormData] = useState({
    start_date: '',
    end_date: '',
    employee_id: localStorage.getItem('user_id'),
    reason_id: '',
    comment: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const requiredFields = ['start_date', 'end_date', 'reason_id'];
    const isFormValid = requiredFields.every(field => formData[field].trim() !== '');

    const start = new Date(formData.start_date);
    const end = new Date(formData.end_date);
    const isDataIntervalValid = start <= end;

    if (isFormValid && isDataIntervalValid) {
      const resp = await createNewRequest(formData);
      if (resp.success) setIsSuccess(true);
    } else setIsError(true)
  }

  useEffect(() => {
    async function fetchData() {
      const absReasons = await getAbsReasons();
      setAbsReasons(absReasons);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsError(false), 2500);
    return () => clearTimeout(timer)
  }, [isError]);

  if (isSuccess) return <Success path='/lists/requests/my' name='my requests' />;

  return <>
    <BackButton path='./../my' />

    {absReasons && <form onSubmit={handleSubmit} className={styles.form}>
      <TextField
        id="start_date"
        name="start_date"
        label="Start Date"
        InputLabelProps={{ shrink: true }}
        variant="outlined"
        type="date"
        required={true}
        value={formData.start}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        id="end_date"
        name="end_date"
        label="End Date"
        InputLabelProps={{ shrink: true }}
        variant="outlined"
        type="date"
        required={true}
        value={formData.end}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="reason-label">Reason *</InputLabel>
        <Select
          labelId="reason-label"
          id="reason_id"
          name="reason_id"
          required={true}
          value={formData.reason_id}
          onChange={handleChange}
          label="Reason"
        >
          {absReasons.map(reason => <MenuItem value={reason.id.toString()} key={reason.id}>{reason.reason}</MenuItem>)}
        </Select>
      </FormControl>

      <TextareaAutosize
        id="comment"
        name="comment"
        aria-label="Comment"
        placeholder="Comment"
        minRows={3}
        value={formData.comment}
        onChange={handleChange}
        style={{width: '100%', marginTop: '16px', resize: 'vertical'}}
      />

      {isError ? <p>You have not filled in the required fields or enter incorrect date range</p> :
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Submit
        </Button>}
    </form>}
  </>
};
