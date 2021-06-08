import React from "react";

import { connect } from "react-redux";
import { selectCartItems } from "../../redux/cart/cart.selectors.js";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component.jsx";

import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems }) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })}
      </div>
      <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
  );
};

// We use selectors because
// this will make sure that our car dropdown component is not getting re rendered whenever
// the state changes, that's unrelated to the cart items.
// So if we sign out our cart items in our cart drop down as well as our car items count is not changing.
// And therefore our cart dropdown and our car icon component do not need to re render, which helps
// save us on performance.
const mapStateToProps = (state) => {
  return {
    cartItems: selectCartItems(state),
  };
};

export default connect(mapStateToProps)(CartDropdown);
