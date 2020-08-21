import React from "react";
import NavBar from "../nav-bar/navBar";
import SignIn from "../sign-in/signIn";
import SignUp from "../sign-up/signUp";

import * as styles from "../main-page/mainPage.module.scss";

console.log(styles);

const MainPage = () => {
  return (
    <div className={styles.main}>
      <NavBar />
      <SignUp />
    </div>
  );
};

export default MainPage;
