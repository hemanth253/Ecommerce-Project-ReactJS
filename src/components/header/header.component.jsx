import React from "react";
import { Link } from "react-router-dom";
import "./header.styles.scss";
import { ReactComponent as Logo } from "../../crown.svg";
import { auth } from "../../firebase/firebase.utils.js";

// connect - higher order component
// higher order components are functions that take components as arguments and return new component(souped up)
import { connect } from "react-redux";

// now we have bought the user props(from root reducer using connect), so we can use this user in header component easily
// currentUser object looks like :- createdAt: t {seconds: 1622928005, nanoseconds: 89000000},displayName: "Hemanth",email: "hemanth@gmail.com",id: "4214xwz6dodAx11Vs87mu1gBoHl2"
const Header = ({ currentUser }) => {
  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/shop">
          CONTACT
        </Link>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
      </div>
    </div>
  );
};

// here the state is the root reducer
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

// This connect(and mapStateToProps) is used whenever we need properties from reducers
// connect can take 1 of 2 components either like mapStateToProps like or
export default connect(mapStateToProps)(Header);
