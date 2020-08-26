import React from "react";
import * as styles from "./signUp.module.scss";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/actions";

import { connect } from "react-redux";
var classNames = require("classnames");
const classes = classNames(styles.input__field);

let userInfo = {
  username: "",
  email: "",
  password: "",
  repeatedPassword: "",
};

const validate = (type, value) => {
  if (type === "username") {
    if (value.length < 3 || value.length > 20) {
      userInfo.username = "";
      return false;
    }
    userInfo.username = value;
    return true;
  } else if (type === "email") {
    const reg = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (value.length > 0 && reg.test(value)) {
      userInfo.email = value;
      return true;
    }
    userInfo.email = "";
    return false;
  } else if (type === "password") {
    const reg = /^\S*$/;
    if (value.length > 5 && value.length < 41 && reg.test(value)) {
      userInfo.password = value;
      return true;
    }
    userInfo.password = "";
    return false;
  } else if (type === "repeat-password") {
    const reg = /^\S*$/;
    if (
      value.length > 5 &&
      value.length < 41 &&
      reg.test(value) &&
      value === userInfo.password
    ) {
      userInfo.repeatedPassword = value;
      return true;
    }
    userInfo.repeatedPassword = "";
    return false;
  }
};

const SignUp = ({ fetchNewUser, user }) => {
  const register = () => {
    const test = {
      username: "allahmoiseevich",
      email: "dsdsdsdsd@allah.com",
      password: "govno1488",
    };

    fetchNewUser(test);
  };
  return (
    <div className={styles.sign__container}>
      <button onClick={() => console.log(userInfo)}>Log</button>
      <h4 className={styles.header}>Create new account</h4>
      <label className={styles.sign__label} htmlFor="username">
        Username
      </label>
      <input
        type="text"
        className={styles.input__field}
        id="username"
        onFocus={(e) => {
          validate("username", e.target.value);
        }}
        onChange={(e) => {
          validate("username", e.target.value);
          if (validate("username", e.target.value)) {
            e.target.classList.remove(styles.input__field_error);
            e.target.classList.add(styles.input__field_ok);
          } else {
            e.target.classList.add(styles.input__field_error);
            e.target.classList.remove(styles.input__field_ok);
          }
        }}
      ></input>
      <label className={styles.sign__label} htmlFor="email">
        Email address
      </label>
      <input
        type="email"
        className={styles.input__field}
        id="email"
        onChange={(e) => {
          if (validate("email", e.target.value)) {
            e.target.classList.remove(styles.input__field_error);
            e.target.classList.add(styles.input__field_ok);
          } else {
            e.target.classList.add(styles.input__field_error);
            e.target.classList.remove(styles.input__field_ok);
          }
        }}
      ></input>
      <label className={styles.sign__label} htmlFor="password">
        Password
      </label>
      <input
        type="password"
        className={styles.input__field}
        id="password"
        onChange={(e) => {
          validate("password", e.target.value);
          if (validate("password", e.target.value)) {
            e.target.classList.remove(styles.input__field_error);
            e.target.classList.add(styles.input__field_ok);
          } else {
            e.target.classList.add(styles.input__field_error);
            e.target.classList.remove(styles.input__field_ok);
          }
        }}
      ></input>
      <label className={styles.sign__label} htmlFor="repeat-password">
        Repeat Password
      </label>
      <input
        type="password"
        className={styles.input__field}
        id="repeat-password"
        onChange={(e) => {
          validate("repeat-password", e.target.value);
          if (validate("repeat-password", e.target.value)) {
            e.target.classList.remove(styles.input__field_error);
            e.target.classList.add(styles.input__field_ok);
          } else {
            e.target.classList.add(styles.input__field_error);
            e.target.classList.remove(styles.input__field_ok);
          }
        }}
      ></input>
      <div className={styles.test}>
        <input
          type="checkbox"
          className={styles.input__checbox}
          id="agree"
        ></input>
        <label className={styles.sign__label_agree} htmlFor="agree">
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

const mapStateToProps = (state) => {
  return {
    user: { ...state.reducerGetArticles },
  };
};
const mapDispatchToProps = (dispatch) => {
  // console.log(dispatch);
  const { fetchNewUser } = bindActionCreators(actions, dispatch);
  return {
    fetchNewUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
