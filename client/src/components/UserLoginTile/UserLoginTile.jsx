import { NavLink } from 'react-router-dom';
import { auth } from '../../utils/auth';
import styles from './UserLoginTile.module.css';

function userRoleColor(user) {
  const colors = {
    employee: 'dodgerblue',
    hr: 'lime',
    pm: 'red',
  }
  return colors[user];
}

export default function UserLoginTile({ user }) {
  return <NavLink to='lists' onClick={() => auth(user.username)} className={styles.user_tile}>
    <img
      src={'/assets/avatars/' + user.avatar}
      className={styles.user_avatar} alt='avatar' />

    <span className={styles.username} style={{ color: userRoleColor(user.role) }}>
      {user.username}
    </span>
  </NavLink>
}
