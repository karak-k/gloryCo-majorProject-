import {
  addToCart,
  removeFromCart,
  saveShippinginfo,
} from "../reducers/Cart Slice/cartSlice";

export const addItemsTocart = (data, quantity) => async (dispatch, getState) => {
  
  const payload = {
   ...data,
    quantity,
  };
  dispatch(addToCart(payload));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch(removeFromCart(id))
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveTheShippingInfo = (shippingData) => async (dispatch, getState) => {
    dispatch(saveShippinginfo(shippingData));
    localStorage.setItem("shippingInfo", JSON.stringify(shippingData));
};
