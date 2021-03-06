import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as styles from "./signIn.module.scss";
import { fetchLogin, fetchCurrentUser } from "../../actions/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
var classNames = require("classnames/bind");
let cx = classNames.bind(styles);

const SignIn = ({ fetchLogin, user, loading }) => {
  const { register, handleSubmit, errors, trigger } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => fetchLogin(data);
  if (user.isLoggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <form className={styles.sign__container} onSubmit={handleSubmit(onSubmit)}>
      <h4 className={styles.header}>Sign In</h4>

      <label className={styles.sign__label} htmlFor="email">
        Email adress
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
        Password
      </label>
      <input
        ref={register({ required: true })}
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
      <input
        type="submit"
        value="Login"
        className={styles.login__btn}
        disabled={loading}
      />
      <p className={styles.login__info}>
        Don't have an account?{" "}
        <Link to="/sign-up/" className={styles.login__link}>
          Sign Up
        </Link>
      </p>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    user: { ...state.reducerGetCurrentuser },
    loading: state.reducerSetStatus.loading,
  };
};

export default connect(mapStateToProps, { fetchLogin, fetchCurrentUser })(
  SignIn
);
