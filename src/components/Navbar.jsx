import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.brand}>
          Cover Page Generator
        </Link>
        <div className={styles.links}>
          <Link to="/create/assignment" className={styles.link}>
            Assignment
          </Link>
          <Link to="/create/lab-report" className={styles.link}>
            Lab Report
          </Link>
        </div>
      </div>
    </nav>
  );
}
