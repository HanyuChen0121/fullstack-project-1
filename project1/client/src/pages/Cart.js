import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux'; // Import connect
import { updateTotalPrice, removeFromCart  } from '../actions/cartActions';

const Cart = ({ cartItems, handleClose, show, updateTotalPrice, totalPrice, removeFromCart  }) => {

    useEffect(() => {
        // Calculate total price and update Redux store
        let total = 0;
        cartItems.forEach(item => {
            total += item.price;
        });
        updateTotalPrice(total); // Dispatch action to update total price
    }, [cartItems, updateTotalPrice]);

    const handleRemove = (itemId) => {
        removeFromCart(itemId); // Dispatch action to remove item from cart
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
                                <img src={item.imageLink} alt={item.name} />
                                <p>{item.productName}</p>
                                <p>Price: ${item.price}</p>
                                
                                <button className="product-button" variant="danger" onClick={() => handleRemove(item._id)}>Remove</button> {/* Add remove button */}
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
    console.log('Redux state:', state); // Add this line to check the structure of the Redux state
    return {
        cartItems: state.cart.cartItems,
        totalPrice: state.cart.totalPrice,
    };
};

const mapDispatchToProps = {
    updateTotalPrice,
    removeFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);