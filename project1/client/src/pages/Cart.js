import React, { useEffect, useState,  } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux'; // Import connect
import { updateTotalPrice, removeFromCart, addToCart  } from '../actions/cartActions';
import { useDispatch } from 'react-redux';
const Cart = ({ cartItems, handleClose, show, updateTotalPrice, totalPrice, removeFromCart  }) => {
    const dispatch = useDispatch();
    const [discount, setDiscount] = useState('');
    const [cartPrice, setCartPrice] = useState(totalPrice);
    const [discountPrice, setDiscountPrice] = useState(0);
    const onClickApply = () => {
        if (discount === "$20 OFF") {
            setCartPrice(prev=> prev - 20);
            setDiscountPrice(prev => prev + 20);
        }
        else if (discount === "$50 OFF") {
            setCartPrice(prev => prev - 50);
            setDiscountPrice(prev => prev + 50);
        }
        else {
            return;
        }
    }
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
                            <div key={item._id} className="product-item">
                                <div className="image-container">
                                    <img src={item.product.imageLink} alt={item.name} />
                                </div>
                                <div className="info-container">
                                    <p>{item.product.productName}</p>
                                    <p style={{ color: 'purple' }}>${item.product.price}</p>
                                    <div className="quantity-controls">
                                        <button className="product-button" onClick={() => handleIncreaseQuantity(item)}>+</button>
                                        <span style={{ margin: '5px' }}>{item.quantity}</span>
                                        <button className="product-button" onClick={() => handleDecreaseQuantity(item)}>-</button>
                                    </div>
                                    <button className="product-button" onClick={() => handleRemove(item.product._id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                        {/* Total Price */}
                        <div>Apply Discount Code: </div>
                        <input
                             type="text"
                             value={discount}
                             onChange={(e) => setDiscount(e.target.value)}
                             placeholder='$20 OFF'
                        />
                        <button className='product-button' style={{marginLeft: '5px'}} onClick={()=>onClickApply()}>Apply</button>

                        <hr />
                        <div style={{fontWeight:'bold', marginTop: '30px'}}>
                            <p>SubTotal:${totalPrice}</p>
                            <p>Tax:${totalPrice * 0.1}</p>
                            {discountPrice ? (<p>discount: $ {discountPrice}</p>) : (<p>discount: $0</p>)

                            }

                            <p>Estimate Total:{totalPrice + totalPrice * 0.1 - discountPrice} </p>
                        </div>
                        <button className='product-button'>Continue to Checkout</button>
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