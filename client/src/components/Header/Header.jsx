import { NavLink } from 'react-router-dom';
import LogoutButton from './LogoutButton/LogoutButton';
import styles from './Header.module.css';

export default function Header() {
  return <header className={styles.header}>
    <NavLink to='/lists' className={styles.logo_button}>
      <img src="/logo.webp" alt="logo" className={styles.logo_image} />
      <span className={styles.title}>Office Management</span>
    </NavLink>
    <LogoutButton />
  </header>
}
