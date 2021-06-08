export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === cartItemToAdd.id;
  });
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  } else {
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
  }
};

// existingCartItem contains the matched object if it exists
