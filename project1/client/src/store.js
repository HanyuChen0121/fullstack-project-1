import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import cartReducer from './reducers/cartReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});
const storedCartItems = localStorage.getItem('cartItems');
const storedTotalPrice = localStorage.getItem('totalPrice');
const persistedState = {
  auth: {
    userId: localStorage.getItem('userId') || null,
    token: localStorage.getItem('token') || null,
  },
  cart: {
    cartItems: storedCartItems ? JSON.parse(storedCartItems) : [],
    totalPrice: storedTotalPrice ? JSON.parse(storedTotalPrice) : 0, // Assuming totalPrice is not stored in localStorage
  }
};

const store = createStore(
  rootReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
