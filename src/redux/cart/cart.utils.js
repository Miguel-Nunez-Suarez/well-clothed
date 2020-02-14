//FUNCTION TO BE CALLED WHEN NEW ITEMS ARE ADDED TO THE CART
export const addItemToCart = (cartItems, cartItemToAdd) => {
  //Check if the new item already exists in the cart
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );

  //if the new item already exists in the cart, we loop the array of items(objects)
  //and when we find the matching item, we increase the quantity property for that object
  if (existingCartItem) {
    //we use the map method because it creates A NEW ARRAY
    //and the component needs to get a new prop to properly re-render
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  //if the new item is not already in the cart
  //we return the same array of objects (cartItems) adding the new item with quantity = 1
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
