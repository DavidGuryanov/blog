import React from "react";
import * as styles from "./signUp.module.scss";

const SignIn = () => {
  return (
    <div className={styles.sign__container}>
      <h4 className={styles.header}>Create new account</h4>
      <label className={styles.sign__label} for="username">
        Username
      </label>
      <input type="text" className={styles.input__field} id="username"></input>
      <label className={styles.sign__label} for="email">
        Email address
      </label>
      <input type="email" className={styles.input__field} id="email"></input>
      <label className={styles.sign__label} for="password">
        Password
      </label>
      <input
        type="password"
        className={styles.input__field}
        id="password"
      ></input>
      <label className={styles.sign__label} for="repeat-password">
        Repeat Password
      </label>
      <input
        type="password"
        className={styles.input__field}
        id="repeat-password"
      ></input>
      <div className={styles.test}>
        <input
          type="checkbox"
          className={styles.input__checbox}
          id="agree"
        ></input>
        <label className={styles.sign__label_agree} for="agree">
          I agree to the processing of my personal information
        </label>
      </div>
      <button className={styles.login__btn}>Create</button>
      <p className={styles.login__info}>
        Already have an account? <a className={styles.login__link}>Sign In</a>
      </p>
    </div>
  );
};

export default SignIn;
