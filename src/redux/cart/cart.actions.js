import { CartActionTypes } from "./cart.types.js";

export const toogleCartHidden = () => ({
  // payload is optional - check cartReducer for better undersstanding why
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
});