export const actionTypes = {
    SET_USER: 'SET_USER',
    REMOVE_USER: 'REMOVE_USER'
  };
  
  // Action to set the user in Redux state
  export const setUser = (userId, token) => ({
    type: actionTypes.SET_USER,
    payload: { userId, token }
  });
  
  // Action to remove the user from Redux state (logout)
  export const removeUser = () => ({
    type: actionTypes.REMOVE_USER
  });
  