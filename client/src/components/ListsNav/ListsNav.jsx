import { NavLink } from 'react-router-dom';
import { links } from '../../utils/data';
import styles from './ListsNav.module.css';

export default function ListsNav({ role }) {
  const navLinks = links[role]

  return <nav className={styles.nav}>
    {navLinks.map(link =>
      <NavLink to={link.path} className={styles.link} key={link.id}>
        {link.title}
      </NavLink>
    )}
  </nav>
}
