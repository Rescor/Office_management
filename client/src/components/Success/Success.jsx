import { NavLink } from 'react-router-dom';
import styles from './Success.module.css'
import {Button} from "@mui/material";
import React from "react";

export default function Success({ path, name }) {
  return <div className={styles.success_notify}>
    <h2 className={styles.title}>Success!</h2>
    <NavLink to={`${path}`}>
      <Button variant="contained">{`Go to ${name}`}</Button>
    </NavLink>
  </div>
}
