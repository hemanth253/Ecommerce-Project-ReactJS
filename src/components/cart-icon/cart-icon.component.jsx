import React from "react";
import { connect } from "react-redux";

import { toogleCartHidden } from "../../redux/cart/cart.actions";

import { ReactComponent as ShopingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";

const CartIcon = ({ toogleCartHidden }) => {
  return (
    // once there is a click in this div object then that dispatches state that be seen in colse since it gets added to the middleware logger
    <div className="cart-icon" onClick={toogleCartHidden}>
      <ShopingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    toogleCartHidden: () => dispatch(toogleCartHidden()),
  };
};

export default connect(null, mapDispatchToProps)(CartIcon);
