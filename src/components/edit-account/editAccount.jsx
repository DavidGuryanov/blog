import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/actions";
import { connect } from "react-redux";
import * as styles from "./editAccount.module.scss";
var classNames = require("classnames/bind");
let cx = classNames.bind(styles);

const EditAccount = () => {
  const { register, handleSubmit, watch, errors, setError, trigger } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => console.log(data);
  return (
    <form
      className={styles.sign__container}
      onSubmit={() => handleSubmit(onSubmit)}
    >
      <h4 className={styles.header}>Edit account</h4>
      <label className={styles.sign__label} htmlFor="username">
        Username
      </label>
      <input
        type="text"
        className={cx({
          input__field: true,
          input__field_error: errors.username,
        })}
        id="username"
        name="username"
        ref={register({ required: true, minLength: 3, maxLength: 20 })}
      ></input>
      {errors.username && errors.username.type === "required" && (
        <p
          className={cx({
            input__error_message: true,
          })}
        >
          This field is required
        </p>
      )}
      {errors.username && errors.username.type === "minLength" && (
        <p
          className={cx({
            input__error_message: true,
          })}
        >
          Username is too short
        </p>
      )}
      {errors.username && errors.username.type === "maxLength" && (
        <p
          className={cx({
            input__error_message: true,
          })}
        >
          Username is too long
        </p>
      )}
      <label className={styles.sign__label} htmlFor="email">
        Email address
      </label>
      <input
        type="email"
        className={cx({
          input__field: true,
          input__field_error: errors.email,
        })}
        id="email"
        name="email"
        ref={register({
          required: true,
          pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        })}
      ></input>
      {errors.email && errors.email.type === "required" && (
        <p
          className={cx({
            input__error_message: true,
          })}
        >
          This field is required
        </p>
      )}
      {errors.email && errors.email.type === "pattern" && (
        <p
          className={cx({
            input__error_message: true,
          })}
        >
          Must be a valid email address
        </p>
      )}
      <label className={styles.sign__label} htmlFor="password">
        New password
      </label>
      <input
        ref={register({ required: true, minLength: 6, maxLength: 40 })}
        type="password"
        className={cx({
          input__field: true,
          input__field_error: errors.password,
        })}
        id="password"
        name="password"
        onChange={() => trigger("repassword")}
      ></input>
      {errors.password && errors.password.type === "required" && (
        <p
          className={cx({
            input__error_message: true,
          })}
        >
          This field is required
        </p>
      )}
      {errors.password && errors.password.type === "minLength" && (
        <p
          className={cx({
            input__error_message: true,
          })}
        >
          Password is too short
        </p>
      )}
      {errors.password && errors.password.type === "maxLength" && (
        <p
          className={cx({
            input__error_message: true,
          })}
        >
          Password is too long
        </p>
      )}
      <label className={styles.sign__label} htmlFor="avatar">
        Avatar img (url)
      </label>
      <input
        type="text"
        className={cx({
          input__field: true,
          input__field_error: errors.avatar,
        })}
        id="avatar"
        name="avatar"
        ref={register({
          pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        })}
      ></input>
      {errors.avatar && errors.avatar.type === "pattern" && (
        <p
          className={cx({
            input__error_message: true,
          })}
        >
          Not a valid URL
        </p>
      )}
      <input type="submit" value="Save" className={styles.login__btn} />
    </form>
  );
};

export default EditAccount;
