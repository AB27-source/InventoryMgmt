import React from 'react';
import { Link } from'react-router-dom';
import styles from './dashboard.module.css'

const Home2Page = () => {
  return (
    <div className = {styles.dashboard}>
        <div className = {styles.box}>
            <Link to="/SnackShelf">Snack Shelf</Link>
        </div>
        <div className = {styles.box}>
            <Link to="/Beverages">Beverage Cooler</Link>
        </div>
        <div className = {styles.box}>
            <Link to="/Freezer">Freezer</Link>
        </div>
    </div>
  )
};

export default Home2Page;