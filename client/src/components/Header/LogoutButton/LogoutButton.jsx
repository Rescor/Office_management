import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from "@mui/material/Button";
import styles from './LogoutButton.module.css';

export default function LogoutButton() {
  const navigate = useNavigate();

  function logoutHandler() {
    localStorage.clear();
    return navigate('/');
  }

  return <div className={styles.logout_btn} onClick={logoutHandler}>
    <Button variant="contained" startIcon={<LogoutIcon />}>
      Logout
    </Button>
  </div>
}
