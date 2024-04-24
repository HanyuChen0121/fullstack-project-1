import { createReducer } from '@reduxjs/toolkit';
import { cartActionTypes } from '../actions/cartActions';

const initialState = {
  cartItems: [],
  totalPrice: 0,
};

const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(cartActionTypes.ADD_TO_CART, (state, action) => {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(item => item.product._id === product._id);
      if (existingItemIndex !== -1) {
        // If the product already exists in cart, update its quantity
        state.cartItems[existingItemIndex].quantity += quantity;
        if (state.cartItems[existingItemIndex].quantity === 0) {
          state.cartItems = state.cartItems.filter(item => item.quantity !== 0);
        }
      } else {
        // If it's a new product, add it to cartItems array
        state.cartItems.push({ product, quantity });
      }
    })
    .addCase(cartActionTypes.UPDATE_TOTAL_PRICE, (state, action) => {
      return {
        ...state,
        totalPrice: action.payload,
      };
    })
    .addCase(cartActionTypes.REMOVE_FROM_CART, (state, action) => {
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.product._id !== action.payload),
      };
    })
    .addDefaultCase((state) => state);
});

export default cartReducer;