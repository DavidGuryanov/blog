import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as styles from "../nav-bar/navBar.module.scss";
var classNames = require("classnames");

const signUpBtn = classNames(styles.btn, styles.signUpBtn);
const signInBtn = classNames(styles.btn, styles.signInBtn);

const NavBar = ({ history }) => {
  return (
    <div className={styles.navbar}>
      <h2 className={styles.header} onClick={(e) => history.push("/")}>
        Realworld Blog
      </h2>
      <button className={signInBtn} onClick={(e) => history.push("/sign-in/")}>
        Sign in
      </button>

      <button className={signUpBtn} onClick={(e) => history.push("/sign-up/")}>
        Sign up
      </button>
    </div>
  );
};

export default withRouter(NavBar);
