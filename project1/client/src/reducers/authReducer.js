import { actionTypes } from '../actions/authActions';

const initialState = {
  userId: null,
  token: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        userId: action.payload.userId,
        token: action.payload.token
      };
    case actionTypes.REMOVE_USER:
      return {
        ...state,
        userId: null,
        token: null
      };
    default:
      return state;
  }
};

export default authReducer;
