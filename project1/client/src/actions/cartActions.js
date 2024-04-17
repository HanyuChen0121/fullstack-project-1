export const cartActionTypes = {
    ADD_TO_CART: 'ADD_TO_CART',
    UPDATE_TOTAL_PRICE: 'UPDATE_TOTAL_PRICE',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART'
  };
export const addToCart = (product) => ({
    type: cartActionTypes.ADD_TO_CART,
    payload: product,
});

export const updateTotalPrice = (totalPrice) => ({
    type: cartActionTypes.UPDATE_TOTAL_PRICE,
    payload: totalPrice,
});

export const removeFromCart = (itemId) => {
    return {
        type: cartActionTypes.REMOVE_FROM_CART,
        payload: itemId,
    };
};