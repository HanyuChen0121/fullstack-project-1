export const actionTypes = {
    SET_USER: 'SET_USER',
    REMOVE_USER: 'REMOVE_USER',
    SET_USER_TYPE: 'SET_USER_TYPE'
  };

  export const setUser = (userId, token) => {
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
    return {
      type: actionTypes.SET_USER,
      payload: { userId, token }
    };
  };
  
  export const removeUser = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    return {
      type: actionTypes.REMOVE_USER
    };
  };
  
  export const setUserType = (type) => {
    localStorage.setItem('type', type);
    return {
      type: actionTypes.SET_USER_TYPE,
      payload: type
    };
  };