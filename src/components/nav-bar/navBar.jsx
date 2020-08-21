import React from "react";
//import classNames from 'classNames'
import * as styles from "../nav-bar/navBar.module.scss";
var classNames = require("classnames");
console.log(classNames);

const signUpBtn = classNames(styles.btn, styles.signUpBtn);
const signInBtn = classNames(styles.btn, styles.signInBtn);

const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <h2 className={styles.header}>Realworld Blog</h2>
      <button className={signInBtn}>Sign In</button>
      <button className={signUpBtn}>Sign Up</button>
    </div>
  );
};

export default NavBar;
