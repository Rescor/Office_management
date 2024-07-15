import { users } from '../../utils/data';
import UserLoginTile from '../../components/UserLoginTile/UserLoginTile';
import styles from './LoginScreen.module.css';

export default function LoginScreen() {
  return <div className={styles.screen_wrapper}>
    <div className={styles.users_wrapper}>
      {users.map(user => <UserLoginTile user={user} key={user.id} />)}
    </div>
  </div>
}
