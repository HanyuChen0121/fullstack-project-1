import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../index.css';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProductDetails = ({ products, cartItems }) => {
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const [isValid, setIsValid] = useState(true); // State to track image validity
    const { userId } = useSelector(state => state.auth);
    const { userType } = useSelector(state => state.auth)
    const handleImageError = () => {
        setIsValid(false); // Set isValid state to false when image fails to load
    };
    const dispatch = useDispatch();
    const getCartItemQuantity = (id) => {
      const existingItemIndex = cartItems.findIndex(item => item.product._id === id);
      if (existingItemIndex !== -1) {
          return cartItems[existingItemIndex].quantity;
      }
      return 0;
    }
    const handleDecreaseQuantity = (product) => {
      const existingItemIndex = cartItems.findIndex(item => item.product._id === product._id);

      // Decrease quantity by 1 if greater than 1
      if (existingItemIndex !== -1 && cartItems[existingItemIndex].quantity > 0) {
          dispatch(addToCart(product, -1));
      }
    };

    const handleIncreaseQuantity = (product) => {
        // Increase quantity by 1
        dispatch(addToCart(product, 1));
    };
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(`http://localhost:5000/api/products/name/${id}`, {
                    method: 'GET',
                });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const contentType = response.headers.get('content-type');
                if (contentType && contentType.indexOf('application/json') !== -1) {
                    const data = await response.json();
                    setProduct(data);
                    
                } else {
                    throw new Error('Response is not in JSON format.');
                }
            
                } catch (error) {
                
                console.log(error);
                }
            
            };
            fetchData();
        }, [id]);
        

    const handleEdit = () => {
        // Edit product logic here
        console.log('Edit product:', product);
    };
    const handleEditClick = (product) => {
        // Navigate to the edit product page
        navigate(`/product/edit/${product._id}`);
      };
      return (
        product !== null && (
          <div className='flex product-details-container'>
            
            <div className='product-content'>
                
              <div>
                <h1>Product Detail</h1>
                {isValid && (
                  <img
                    className='product-detial-img'
                    src={product.imageLink}
                    alt={product.productName}
                    onError={handleImageError} // Call handleImageError when image fails to load
                  />
                )}
              </div>
              <div className='product-details'>
                <p>Category1</p>
                <h2>{product.productName}</h2>
                <h2>${product.price}</h2>
                <h3>{product.productDescription}</h3>
                <p>Price: {product.price}</p>
                <button className="product-button" onClick={() => handleIncreaseQuantity(product)}>+</button>
                <span style={{ margin: '5px' }}>{getCartItemQuantity(product._id)}</span>
                <button className="product-button" onClick={() => handleDecreaseQuantity(product)}>-</button>
                {userId && userType === 'ADMIN' && (<button className="product-button" onClick={() => handleEditClick(product)}>Edit</button>)}
              </div>
            </div>
          </div>
        )
      );
};
const mapDispatchToProps = {
  addToCart,
};
const mapStateToProps = (state) => {
  return {
      cartItems: state.cart.cartItems,
      totalPrice: state.cart.totalPrice,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);