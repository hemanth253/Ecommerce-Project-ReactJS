import React from "react";
import { Link } from "react-router-dom";
import "./header.styles.scss";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils.js";
import CartIcon from "../cart-icon/cart-icon.component.jsx";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

// connect - higher order component
// higher order components are functions that take components as arguments and return new component(souped up)
import { connect } from "react-redux";
// just for structuring selectors
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors.js";
import { selectCartHidden } from "../../redux/cart/cart.selectors.js";

// now we have bought the user props(from root reducer using connect), so we can use this user in header component easily
// currentUser object looks like :- createdAt: t {seconds: 1622928005, nanoseconds: 89000000},displayName: "Hemanth",email: "hemanth@gmail.com",id: "4214xwz6dodAx11Vs87mu1gBoHl2"
const Header = ({ currentUser, hidden }) => {
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
        <CartIcon />
      </div>
      {!hidden ? <CartDropdown /> : null}
    </div>
  );
};

// here the state is the root reducer
// (state)-->({user:{currentUser},cart:{hidden}})---> advanced destructuring, we can directly use currentUser and hidden
// if key and value are of same variable name then we can pass that name directly in object like {x,y} instead of {x:x,y:y}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

// ------------- above or below ------------------

// const mapStateToProps = (state) => {
//   return {
//     currentUser: selectCurrentUser(state),
//     hidden: selectCartHidden(state),
//   };
// };

// This connect(and mapStateToProps) is used whenever we need properties from reducers
// connect can take 1 of 2 components either like mapStateToProps like or
export default connect(mapStateToProps)(Header);
