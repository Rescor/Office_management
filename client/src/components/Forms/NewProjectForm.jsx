import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material';
import { createNewProject, getProjectStatuses, getManagers, getProjectTypes } from '../../utils/http';
import Success from '../Success/Success';
import BackButton from '../BackButton';
import styles from './Form.module.css';

export default function NewProjectForm() {
  const [types, setTypes] = useState(undefined);
  const [statuses, setStatuses] = useState(undefined);
  const [managers, setManagers] = useState(undefined);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(undefined);
  const [formData, setFormData] = useState({
    type_id: '',
    start_date: '',
    end_date: null,
    manager_id: '',
    comment: '',
    status_id: ''
  });

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const requiredFields = ['type_id', 'start_date', 'manager_id', 'status_id'];
    const isFormValid = requiredFields.every(field => formData[field].trim() !== '');

    if (formData.end_date) {
      const start = new Date(formData.start_date);
      const end = new Date(formData.end_date);
      const isDataIntervalValid = start <= end;

      if (isFormValid && isDataIntervalValid) {
        const resp = await createNewProject(formData);
        if (resp.success) setIsSuccess(true);
      } else setIsError(true);
    }

    else {
      if (isFormValid) {
        const resp = await createNewProject(formData);
        if (resp.success) setIsSuccess(true);
      } else setIsError(true);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const types = await getProjectTypes();
      const statuses = await getProjectStatuses();
      const managers = await getManagers();
      setTypes(types);
      setStatuses(statuses);
      setManagers(managers);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsError(false), 2500);
    return () => clearTimeout(timer)
  }, [isError]);

  if (isSuccess) return <Success path='/lists/projects' name='projects' />;

  return <>
    <BackButton path='./../' />

    {(types && statuses && managers) && <form onSubmit={handleSubmit} className={styles.form}>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="type-label">Type *</InputLabel>
        <Select
          labelId="type-label"
          id="type_id"
          name="type_id"
          required={true}
          value={formData.type_id}
          onChange={handleChange}
          label="Type"
        >
          {types.map(type => <MenuItem value={type.id.toString()} key={type.id}>{type.type}</MenuItem>)}
        </Select>
      </FormControl>

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
        value={formData.end}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="manager-label">Project Manager *</InputLabel>
        <Select
          labelId="manager-label"
          id="manager_id"
          name="manager_id"
          required={true}
          value={formData.manager_id}
          onChange={handleChange}
          label="Project Manager"
        >
          {managers.map(manager => <MenuItem value={manager.id.toString()} key={manager.id}>{manager.name}</MenuItem>)}
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="status-label">Status *</InputLabel>
        <Select
          labelId="status-label"
          id="status_id"
          name="status_id"
          required={true}
          value={formData.status_id}
          onChange={handleChange}
          label="Status"
        >
          {statuses.map(status => <MenuItem value={status.id.toString()} key={status.id}>{status.status}</MenuItem>)}
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
          Create
        </Button>}
    </form>}
  </>
};
