import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as styles from "../nav-bar/navBar.module.scss";
var classNames = require("classnames");

const signUpBtn = classNames(styles.btn, styles.signUpBtn);
const signInBtn = classNames(styles.btn, styles.signInBtn);

const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <h2 className={styles.header}>
        <Link to="/">Realworld Blog</Link>
      </h2>
      <button className={signInBtn}>
        <Link to="/login">Sign In</Link>
      </button>
      <button className={signUpBtn}>
        <Link to="/register">Sign Up</Link>
      </button>
    </div>
  );
};

export default NavBar;
