import React, { useState } from "react";
import * as styles from "./signUp.module.scss";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/actions";

import { connect } from "react-redux";

var classNames = require("classnames/bind");

let cx = classNames.bind(styles);

// let errors = {
//   nameTooShort: false,
//   nameTooLong: false,
// };

const SignUp = ({ fetchNewUser, user }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pas, setPas] = useState("");
  const [rePas, setRePas] = useState("");
  const [errors, setErrors] = useState({
    nameTooShort: false,
    nameTooLong: false,
    invalidEmail: false,
    passwordTooShort: false,
    passwordTooLong: false,
    passwordsNotMatch: false,
  });

  const validate = (type, value) => {
    switch (type) {
      case "username":
        if (value.length > 2 && value.length < 21) {
          setUsername(value);
          setErrors({ ...errors, nameTooLong: false, nameTooShort: false });
          return true;
        }
        value.length < 3
          ? setErrors({ ...errors, nameTooShort: true, nameTooLong: false })
          : setErrors({ ...errors, nameTooLong: true, nameTooShort: false });
        setUsername("");
        return false;
      case "email":
        const mailReg = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        if (value.length > 0 && mailReg.test(value)) {
          setEmail(value);
          setErrors({ ...errors, invalidEmail: false });
          return true;
        }
        setErrors({ ...errors, invalidEmail: true });
        setEmail("");
        return false;
      case "password":
        const pasReg = /^\S*$/;
        if (value.length > 5 && value.length < 41 && pasReg.test(value)) {
          setPas(value);
          if (value !== rePas) {
            //setRePas("");
            setErrors({
              ...errors,
              passwordTooLong: false,
              passwordTooShort: false,
              passwordsNotMatch: true,
            });
            return true;
          }
          setErrors({
            ...errors,
            passwordTooLong: false,
            passwordTooShort: false,
            passwordsNotMatch: false,
          });
          return true;
        }
        value.length < 6
          ? setErrors({
              ...errors,
              passwordTooShort: true,
              passwordTooLong: false,
            })
          : setErrors({
              ...errors,
              passwordTooLong: true,
              passwordTooShort: false,
            });

        setPas("");
        return false;
      case "repeat-password":
        if (value === pas) {
          setRePas(value);
          setErrors({ ...errors, passwordsNotMatch: false });
          return true;
        }
        setErrors({ ...errors, passwordsNotMatch: true });
        setRePas("");
        return false;
    }
  };

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
      <button
        onClick={() => {
          console.log(username, pas, rePas, email, errors);
        }}
      >
        Log
      </button>
      <h4 className={styles.header}>Create new account</h4>
      <label className={styles.sign__label} htmlFor="username">
        Username
      </label>
      <input
        type="text"
        className={cx({
          input__field: true,
          input__field_ok: username,
          input__field_error: !username,
        })}
        id="username"
        onFocus={(e) => {
          validate("username", e.target.value);
        }}
        onChange={(e) => {
          validate("username", e.target.value);
        }}
      ></input>
      <p
        className={cx({
          input__error_message: true,
          display: errors.nameTooShort,
          hide: !errors.nameTooShort,
        })}
      >
        Username is too short
      </p>
      <p
        className={cx({
          input__error_message: true,
          display: errors.nameTooLong,
          hide: !errors.nameTooLong,
        })}
      >
        Username is too long
      </p>
      <label className={styles.sign__label} htmlFor="email">
        Email address
      </label>
      <input
        type="email"
        className={cx({
          input__field: true,
          input__field_ok: email,
          input__field_error: !email,
        })}
        id="email"
        onChange={(e) => {
          validate("email", e.target.value);
        }}
      ></input>
      <p
        className={cx({
          input__error_message: true,
          display: errors.invalidEmail,
          hide: !errors.invalidEmail,
        })}
      >
        Must be a valid email address
      </p>
      <label className={styles.sign__label} htmlFor="password">
        Password
      </label>
      <input
        type="password"
        className={cx({
          input__field: true,
          input__field_ok: pas,
          input__field_error: !pas,
        })}
        id="password"
        onChange={(e) => {
          validate("password", e.target.value);
        }}
      ></input>
      <p
        className={cx({
          input__error_message: true,
          display: errors.passwordTooShort,
          hide: !errors.passwordTooShort,
        })}
      >
        Too short
      </p>
      <p
        className={cx({
          input__error_message: true,
          display: errors.passwordTooLong,
          hide: !errors.passwordTooLong,
        })}
      >
        Too long
      </p>
      <p
        className={cx({
          input__error_message: true,
          display: errors.passwordsNotMatch,
          hide: !errors.passwordsNotMatch,
        })}
      >
        Passwords must match
      </p>
      <label className={styles.sign__label} htmlFor="repeat-password">
        Repeat Password
      </label>
      <input
        type="password"
        className={cx({
          input__field: true,
          input__field_ok: rePas === pas && pas.length > 0,
          input__field_error:
            rePas !== pas || pas.length === 0 || rePas.length === 0,
        })}
        id="repeat-password"
        onChange={(e) => {
          validate("repeat-password", e.target.value);
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
