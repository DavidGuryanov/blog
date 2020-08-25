import React from "react";
import * as styles from "./signIn.module.scss";

const SignIn = () => {
  return (
    <div className={styles.sign__container}>
      <h4 className={styles.header}>Sign In</h4>

      <label className={styles.sign__label} htmlFor="email">
        Email adress
      </label>
      <input type="email" className={styles.input__field} id="email"></input>
      <label className={styles.sign__label} htmlFor="password">
        Password
      </label>
      <input
        type="password"
        className={styles.input__field}
        id="password"
      ></input>
      <button className={styles.login__btn}>Login</button>
      <p className={styles.login__info}>
        Don't have an account? <a className={styles.login__link}>Sign Up</a>
      </p>
    </div>
  );
};

export default SignIn;
