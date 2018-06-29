import React from 'react';
import Link from 'gatsby-link';

import styles from './landing.module.scss';

import logo from './landing-assets/logo.svg'
import frameworkImg from './landing-assets/framework-agnostic.svg';
import dependencyImg from './landing-assets/dependency-injection.svg';
import modularImg from './landing-assets/modular-structure.svg';
import arrow from './landing-assets/arrow.svg';

import { OutboundLink } from 'gatsby-plugin-google-analytics';

const LandingPage = () => (
  <div className={styles.landing}>
    <div className={styles.section}>
      <img className={styles.landing__logo} src={logo} />
      <h1 className={styles.landing__header}>Loveable, high-level framework for Node.js</h1>
      <p className={styles.landing__subheader}>Build a testable, modular backend with a dependency injection pattern in plain JavaScript.</p>
      <div className={styles.btn__wrapper}>
        <Link to="/docs/basics/index" className={styles.landing__btn}>
          <span className={styles.btn__text}>Get started <img src={arrow} /></span>
        </Link>

        <Link to="/tutorial/main/First" className={styles['landing__btn--alt']}>
          <span className={styles.btn__text}>Take the tutorial</span>
        </Link>
      </div>
    </div>

    <div className={`${styles.section} ${styles.features}`}>
      <h2 className={styles.features__header}>Why you should try Hadron</h2>
      <div className={styles.features__row}>
        <div className={styles.features__unit}>
          <img src={frameworkImg} />
          <h3>Low-level framework-agnostic</h3>
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

    <div className={styles.section}>
      <p className={styles.landing__subheader}>Built with TypeScript, but it's primary target is JavaScript apps. Hadron’s API embraces current ECMAScript standards, with the cherry of good IDE support via codebase types declarations on top.</p>
      <div className={styles.btn__wrapper}>
        <Link to="/docs/basics/index" className={styles.landing__btn}>
          <span className={styles.btn__text}>Get started <img src={arrow} /></span>
        </Link>
      </div>
    </div>

    <footer className={`${styles.section} ${styles.footer}`}>
      <div className={styles.footer__wrapper}>
        <h2>About</h2>
        <p>Built with <OutboundLink href="http://brainhub.eu">❤️</OutboundLink> by <OutboundLink href="http://brainhub.eu">Brainhub</OutboundLink>, JavaScript brainiacs ready to build your next app.</p>
      </div>
    </footer>
  </div>
);

export default LandingPage;
