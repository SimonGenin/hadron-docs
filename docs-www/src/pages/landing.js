import React from 'react';
import Link from 'gatsby-link';

import styles from './landing.module.scss';

const LandingPage = () => (
  <div className={styles.landing}>
    <div>
      <h1 className={styles.landing__header}>Hadron</h1>
      <p className={styles.landing__subheader}>Super Duper Hadron Website</p>
      <div className={styles.btn__wrapper}>
        <Link to="/docs/basics/index" className={styles.landing__btn}>
          <span>Get started!</span>
        </Link>
        <Link to="/tutorial/main/First" className={styles['landing__btn--alt']}>
          <span>I'm a useless button!</span>
        </Link>
      </div>
    </div>
  </div>
);

export default LandingPage;
