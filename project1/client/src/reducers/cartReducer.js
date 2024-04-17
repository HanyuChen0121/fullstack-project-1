import { createReducer } from '@reduxjs/toolkit';
import { cartActionTypes } from '../actions/cartActions';

const initialState = {
  cartItems: [],
  totalPrice: 0,
};

const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(cartActionTypes.ADD_TO_CART, (state, action) => {
      // Update cartItems with the new product, ensuring immutability
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
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
        cartItems: state.cartItems.filter(item => item._id !== action.payload),
      };
    })
    .addDefaultCase((state) => state);
});

export default cartReducer;