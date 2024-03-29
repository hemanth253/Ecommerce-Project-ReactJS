import React from "react";

import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.component.jsx";
import CustomButton from "../custom-button/custom-button.component.jsx";

import { auth, signInWithGoogle } from "../../firebase/firebase.utils.js";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }
  // Async---->
  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        email: "",
        password: "",
      });
    } catch (err) {
      console.log("SignIn :", err.message);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  render() {
    return (
      <div className="sign-in">
        <h2 className="title">I aldready have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="Password"
            required
          />
          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton
              type="button"
              onClick={signInWithGoogle}
              isGoogleSignIn
            >
              Sign in with Google
            </CustomButton>
          </div>
          {/* <CustomButton onClick={signInWithFacebook}>
            Sign in with Facebook
          </CustomButton> */}
        </form>
      </div>
    );
  }
}

export default SignIn;
