import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import heroBg from "../../icons/HomePic.jpg";

const Home = () => {
  return (
    <div className={styles.hero} style={{ backgroundImage: `url(${heroBg})` }}>
      <div className={styles.homeContainer}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Campers of your dreams</h1>
          <p className={styles.subtitle}>
            You can find everything you want in our catalog
          </p>
          <Link to="/catalog" className={styles.ctaButton}>
            View Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
