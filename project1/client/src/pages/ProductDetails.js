import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../index.css';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProductDetails = ({ products }) => {
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const [isValid, setIsValid] = useState(true); // State to track image validity
    const { userId } = useSelector(state => state.auth);
    const handleImageError = () => {
        setIsValid(false); // Set isValid state to false when image fails to load
    };
    const dispatch = useDispatch();
    const onClickAddProduct = (product) => {
        console.log(product)
        dispatch(addToCart(product));;
    }
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
                <button className="product-button" onClick={() => onClickAddProduct(product)}>Add to Cart</button>
                {userId && (<button className="product-button" onClick={() => handleEditClick(product)}>Edit</button>)}
              </div>
            </div>
          </div>
        )
      );
};
const mapDispatchToProps = {
    addToCart,
}
export default connect(null, mapDispatchToProps)(ProductDetails);