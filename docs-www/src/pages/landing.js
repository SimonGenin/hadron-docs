import React from 'react';
import Link from 'gatsby-link';

import styles from './landing.module.scss';

import frameworkImg from './landing-assets/framework-agnostic.svg';
import dependencyImg from './landing-assets/dependency-injection.svg';
import modularImg from './landing-assets/modular-structure.svg';

const LandingPage = () => (
  <div className={styles.landing}>
    <div>
      <img src='http://via.placeholder.com/256x256' />
      <h1 className={styles.landing__header}>Loveable, high-level framework for Node.js</h1>
      <p className={styles.landing__subheader}>Build a testable, modular backend with a dependency injection pattern in plain JavaScript.</p>
      <div className={styles.btn__wrapper}>
        <Link to="/docs/basics/index" className={styles.landing__btn}>
          <span>Get started!</span>
        </Link>
      </div>
    </div>

    <div className={styles.features}>
      <h2 className={styles.features__header}>Why you should try Hadron</h2>
      <div className={styles.features__row}>
        <div className={styles.features__unit}>
          <img src={frameworkImg} />
          <h3>Framework-agnostic</h3>
          <p>Your application is built independently from other frameworks (Express, Koa). Hadron creates a layer between HTTP requests and your app written in plain Javascript.</p>
        </div>
        <div className={styles.features__unit}>
          <img src={dependencyImg} />
          <h3>Dependency injection</h3>
          <p>The dependency injection pattern enables you to easily change interface implementation. Hadron gives us the power to create SOLID applications.</p>
        </div>
        <div className={styles.features__unit}>
          <img src={modularImg} />
          <h3>Modular structure</h3>
          <p>The modular structure enables you to add/remove packages or create your own extensions. Hadron provides a complete solution for request processing using separate packages.</p>
        </div>
      </div>
    </div>

  </div>
);

export default LandingPage;
