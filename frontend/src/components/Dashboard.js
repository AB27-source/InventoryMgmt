import React from 'react';
import { Link } from 'react-router-dom';
import styles from './dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.box}>
        <Link to="/home2">Home2</Link>
      </div>
      <div className={styles.box}>
        <Link to="/other1">Other</Link>
      </div>
      <div className={styles.box}>
        <Link to="/other2">Other</Link>
      </div>
    </div>
  );
};

export default Dashboard;
