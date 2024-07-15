import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { addEmployeeToProject, getAllEmployees } from '../../utils/http';
import Success from '../Success/Success';
import BackButton from '../BackButton';
import styles from './Form.module.css';

export default function AddEmployeeToProjectForm() {
  const params = useParams();
  const [employees, setEmployees] = useState(undefined);
  const [selectedEmployee, setSelectedEmployee] = useState({employee_id: ''});
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(undefined);

  const handleChange = (event) => {
    setSelectedEmployee({employee_id: event.target.value});
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const requiredFields = ['employee_id'];
    const isFormValid = requiredFields.every(field => selectedEmployee[field].toString().trim() !== '');

    if (isFormValid) {
      const resp = await addEmployeeToProject(params.id, selectedEmployee);
      if (resp.success) setIsSuccess(true);
    } else setIsError(true)
  }

  useEffect(() => {
    async function fetchData() {
      const employees = await getAllEmployees();
      setEmployees(employees);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsError(false), 1250);
    return () => clearTimeout(timer)
  }, [isError]);

  if (isSuccess) return <Success path='./../' name='project employees' />;

  return <>
    <BackButton path='./../' />

    {employees && <form onSubmit={handleSubmit} className={styles.form}>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="employee-label">Employee *</InputLabel>
        <Select
          labelId="employee-label"
          id="employee_id"
          name="employee_id"
          required={true}
          value={selectedEmployee.employee_id}
          onChange={handleChange}
          label="Reason"
        >
          {employees.map(employee => <MenuItem value={employee.id.toString()} key={employee.id}>{employee.name}</MenuItem>)}
        </Select>
      </FormControl>

      {isError ? <p>You have not filled in the required fields</p> : <>
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Submit
        </Button>
      </>}
    </form>}
  </>
};
