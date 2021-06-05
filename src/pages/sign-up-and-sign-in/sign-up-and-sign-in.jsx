import React from "react";

import "./sign-up-and-sign-in.styles.scss";
import SignIn from "../../components/sign-in/sign-in.component.jsx";
import SignUp from "../../components/sign-up/sign-up.component.jsx";

const SignUpAndSignInPage = () => {
  return (
    <div className="sign-up-and-sign-in">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SignUpAndSignInPage;
