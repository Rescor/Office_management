import styles from './Welcome.module.css';

export default function Welcome({ name }) {
  return <p className={styles.welcome}>Welcome, {name}!</p>
}
