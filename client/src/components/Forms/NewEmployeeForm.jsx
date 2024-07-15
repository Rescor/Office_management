import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { getSubdivisions, getEmployeeStatuses, getPartners, getPositions, createNewEmployee } from '../../utils/http';
import Success from '../Success/Success';
import BackButton from '../BackButton';
import styles from './Form.module.css';

export default function NewEmployeeForm() {
  const [subdivisions, setSubdivisions] = useState(undefined);
  const [positions, setPositions] = useState(undefined);
  const [statuses, setStatuses] = useState(undefined);
  const [partners, setPartners] = useState(undefined);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(undefined);
  const [formData, setFormData] = useState({
    name: '',
    subdivision_id: '',
    position_id: '',
    status_id: '',
    partner_id: '',
    absence_balance: 0
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
    const requiredFields = ['name', 'subdivision_id', 'position_id', 'partner_id', 'absence_balance', 'status_id'];
    const isFormValid = requiredFields.every(field => formData[field].trim() !== '');

    if (isFormValid) {
      const resp = await createNewEmployee(formData);
      if (resp.success) setIsSuccess(true);
    } else setIsError(true)
  }

  useEffect(() => {
    async function fetchData() {
      const subdivisions = await getSubdivisions();
      const statuses = await getEmployeeStatuses();
      const partners = await getPartners();
      const positions = await getPositions();
      setSubdivisions(subdivisions);
      setStatuses(statuses);
      setPartners(partners);
      setPositions(positions);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsError(false), 1250);
    return () => clearTimeout(timer)
  }, [isError]);

  if (isSuccess) return <Success path='/lists/employees' name='employees' />;

  return <>
    <BackButton path='./../' />

    {(statuses && positions && partners && subdivisions) && <form onSubmit={handleSubmit} className={styles.form}>
      <TextField
        id="name"
        name="name"
        label="Name"
        InputLabelProps={{ shrink: true }}
        variant="outlined"
        required={true}
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="subdivision-label">Subdivision *</InputLabel>
        <Select
          labelId="subdivision-label"
          id="subdivision_id"
          name="subdivision_id"
          required={true}
          value={formData.subdivision_id}
          onChange={handleChange}
          label="Subdivision"
        >
          {subdivisions.map(subdivision => <MenuItem value={subdivision.id.toString()} key={subdivision.id}>{subdivision.name}</MenuItem>)}
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="position-label">Position *</InputLabel>
        <Select
          labelId="position-label"
          id="position_id"
          name="position_id"
          required={true}
          value={formData.position_id}
          onChange={handleChange}
          label="Position"
        >
          {positions.map(position => <MenuItem value={position.id.toString()} key={position.id}>{position.name}</MenuItem>)}
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="partner-label">Partner *</InputLabel>
        <Select
          labelId="partner-label"
          id="partner_id"
          name="partner_id"
          required={true}
          value={formData.partner_id}
          onChange={handleChange}
          label="Partner"
        >
          {partners.map(partner => <MenuItem value={partner.id.toString()} key={partner.id}>{partner.name}</MenuItem>)}
        </Select>
      </FormControl>

      <TextField
        id="absence_balance"
        name="absence_balance"
        label="Absence Balance"
        InputLabelProps={{ shrink: true }}
        variant="outlined"
        required={true}
        type="number"
        value={formData.absence_balance}
        onChange={handleChange}
        fullWidth
        margin="normal"
        inputProps={{ min: 0 }}
      />

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

      {isError ? <p>You have not filled in the required fields</p> :
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px' }}>
          Submit
        </Button>}
    </form>}
  </>
};
