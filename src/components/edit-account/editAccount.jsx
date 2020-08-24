import React from "react";
import * as styles from "./editAccount.module.scss";

const EditAccount = () => {
  return (
    <div className={styles.sign__container}>
      <h4 className={styles.header}>Edit account</h4>
      <label className={styles.sign__label} for="username">
        Username
      </label>
      <input type="text" className={styles.input__field} id="username"></input>
      <label className={styles.sign__label} for="email">
        Email address
      </label>
      <input type="email" className={styles.input__field} id="email"></input>
      <label className={styles.sign__label} for="password">
        New password
      </label>
      <input
        type="password"
        className={styles.input__field}
        id="password"
      ></input>
      <label className={styles.sign__label} for="avatar">
        Avatar img (url)
      </label>
      <input type="text" className={styles.input__field} id="avatar"></input>
      <button className={styles.login__btn}>Save</button>
    </div>
  );
};

export default EditAccount;
