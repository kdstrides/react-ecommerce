export const addItemToCart = (cartItems, cartItemToAdd) => {
  const exitsingCartItem = cartItems
    .find(cartItem => cartItem.id === cartItemToAdd.id);

  if (exitsingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [
    ...cartItems,
    {
      ...cartItemToAdd,
      quantity: 1
    }
  ]
};