import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

// selector for cartItems
// Not Sure : whenever the state.cart value changes this will re run else it uses memory
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

// Now we memoize the cartItems
// selector for cart item count
// Not Sure : whenever the cart.cartItems value changes this will re run else it uses memory
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
    0
  )
);
