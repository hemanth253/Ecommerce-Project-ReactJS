import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

// selector for cartItems
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);
// Now we memoize the cartItems
// selector for cart item count
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
);
