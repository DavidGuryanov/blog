import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/actions";
import { connect } from "react-redux";
import { Avatar, Alert, message, Button, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

import * as styles from "../nav-bar/navBar.module.scss";
var classNames = require("classnames");

const signUpBtn = classNames(styles.btn, styles.signUpBtn);
const signInBtn = classNames(styles.btn, styles.signInBtn);
const signOutBtn = classNames(styles.btn, styles.signOutBtn);
const createArticleBtn = classNames(styles.btn, styles.createArticleBtn);
const editAccountBtn = classNames(styles.btn, styles.editAccountBtn);

const NavBar = (props) => {
  //props.logOut();
  const { history, user, isLoggedIn, errors } = props;

  const error = () => {
    for (const [key, value] of Object.entries(errors)) {
      message.error(`${key} error: ${key} ${value}`);
    }
  };
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      error();
    }
  }, [errors]);

  let username, avatar, pic;
  if (isLoggedIn) {
    username = user.username;
    avatar = user.image;
    pic = <Avatar src={avatar} size={46} />;
    if (!avatar) {
      pic = (
        <Avatar style={{ color: "#ffffff", backgroundColor: "#1890ff" }}>
          {username.slice(0, 1)}
        </Avatar>
      );
    }
  }

  return (
    <div className={styles.navbar}>
      <h2 className={styles.header} onClick={(e) => history.push("/")}>
        Realworld Blog
      </h2>

      {isLoggedIn ? (
        <>
          <button
            className={createArticleBtn}
            onClick={(e) => history.push("/profile/")}
          >
            Create article
          </button>
          <button
            className={editAccountBtn}
            onClick={(e) => history.push("/profile/")}
          >
            {username}
            {pic}
          </button>
          <button
            className={signOutBtn}
            onClick={() => {
              props.logOut();
              history.push("/");
            }}
          >
            Log out
          </button>
        </>
      ) : (
        <>
          <button
            className={signInBtn}
            onClick={(e) => history.push("/sign-in/")}
          >
            Sign in
          </button>

          <button
            className={signUpBtn}
            onClick={(e) => history.push("/sign-up/")}
          >
            Sign up
          </button>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: { ...state.reducerGetCurrentuser.currentUser },
    isLoggedIn: state.reducerGetCurrentuser.isLoggedIn,
    errors: state.reducerHandleErrors.errors,
  };
};
const mapDispatchToProps = (dispatch) => {
  const { fetchCurrentUser, logOut } = bindActionCreators(actions, dispatch);
  return {
    fetchCurrentUser,
    logOut,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
