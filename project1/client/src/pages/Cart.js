import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux'; // Import connect
import { updateTotalPrice, removeFromCart, addToCart  } from '../actions/cartActions';
import { useDispatch } from 'react-redux';
const Cart = ({ cartItems, handleClose, show, updateTotalPrice, totalPrice, removeFromCart  }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        // Calculate total price and update Redux store
        let total = 0;
        cartItems.forEach(item => {
            total += item.product.price * item.quantity;
        });
        updateTotalPrice(total); // Dispatch action to update total price
    }, [cartItems, updateTotalPrice]);

    const handleRemove = (itemId) => {
        removeFromCart(itemId); // Dispatch action to remove item from cart
    };
    const handleDecreaseQuantity = (item) => {
        // Decrease quantity by 1 if greater than 1
        if (item.quantity > 0) {
            dispatch(addToCart(item.product, -1));
        }
    };

    const handleIncreaseQuantity = (item) => {
        // Increase quantity by 1
        dispatch(addToCart(item.product, 1));
    };
    return (
        <Modal show={show} onHide={handleClose}>
            {/* Modal content */}
            <Modal.Body>
                {/* Cart items */}
                {cartItems.length > 0 ? (
                    <div>
                        {cartItems.map(item => (
                            <div key={item._id}>
                                <img src={item.product.imageLink} alt={item.name} />
                                <p>{item.product.productName}</p>
                                <p>Price: ${item.product.price}</p>
                               
                                <button className="product-button" onClick={() => handleIncreaseQuantity(item)}>+</button>
                                    <span style={{ margin: '5px' }}>{item.quantity}</span>
                                <button className="product-button" onClick={() => handleDecreaseQuantity(item)}>-</button>
                                <button className="product-button" variant="danger" onClick={() => handleRemove(item.product._id)}>Remove</button> {/* Add remove button */}
                                <hr />
                            </div>
                        ))}
                        {/* Total Price */}
                        <p>Total Price: ${totalPrice}</p>
                    </div>
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </Modal.Body>
            {/* Modal footer */}
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        cartItems: state.cart.cartItems,
        totalPrice: state.cart.totalPrice,
    };
};

const mapDispatchToProps = {
    addToCart,
    updateTotalPrice,
    removeFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);