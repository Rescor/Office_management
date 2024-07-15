import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';

export default function BackButton({ path }) {
  return <NavLink to={path} style={{marginLeft: '10px'}}>
    <Button variant="contained" size="small">{'<- '}Back</Button>
  </NavLink>
}
