import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as styles from "./signUp.module.scss";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

var classNames = require("classnames/bind");
let cx = classNames.bind(styles);

const SignUp = ({ fetchNewUser, user, loading }) => {
  const { register, handleSubmit, watch, errors, trigger } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => fetchNewUser(data);
  if (user.isLoggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <form className={styles.sign__container} onSubmit={handleSubmit(onSubmit)}>
      <h4 className={styles.header}>Create new account</h4>
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
        Password
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
      <label className={styles.sign__label} htmlFor="repeat-password">
        Repeat Password
      </label>
      <input
        type="password"
        ref={register({
          required: true,
          validate: (value) => {
            return value === watch("password");
          },
        })}
        className={cx({
          input__field: true,
          input__field_error: errors.repassword,
        })}
        id="repeat-password"
        name="repassword"
      ></input>
      {errors.repassword && errors.repassword.type === "required" && (
        <p
          className={cx({
            input__error_message: true,
          })}
        >
          This field is required
        </p>
      )}
      {errors.repassword && errors.repassword.type === "validate" && (
        <p
          className={cx({
            input__error_message: true,
          })}
        >
          Passwords must match
        </p>
      )}
      <div className={styles.test}>
        <input
          type="checkbox"
          className={styles.input__checbox}
          id="agree"
          ref={register({ required: true })}
          name="agree"
        ></input>
        <label className={styles.sign__label_agree} htmlFor="agree">
          I agree to the processing of my personal information
          {errors.agree && errors.agree.type === "required" && (
            <p
              className={cx({
                input__error_message: true,
              })}
            >
              This field is required
            </p>
          )}
        </label>
      </div>
      <input
        type="submit"
        className={styles.login__btn}
        value="Create"
        disabled={loading}
      />
      <p className={styles.login__info}>
        Already have an account?{" "}
        <Link to="/sign-in/" className={styles.login__link}>
          Sign In
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
const mapDispatchToProps = (dispatch) => {
  const { fetchNewUser, fetchCurrentUser } = bindActionCreators(
    actions,
    dispatch
  );
  return {
    fetchNewUser,
    fetchCurrentUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
