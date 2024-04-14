import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = ({ products }) => {
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const [isValid, setIsValid] = useState(true); // State to track image validity
    const handleImageError = () => {
        setIsValid(false); // Set isValid state to false when image fails to load
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
        
    console.log("here");
    console.log(product);
    const handleAddToCart = () => {
        // Add to cart logic here
        console.log('Product added to cart:', product);
    };

    const handleEdit = () => {
        // Edit product logic here
        console.log('Edit product:', product);
    };

    return ( product !== null  && (
        <div>
            <h1>Product Detail</h1>
            <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '20px' }}>
                    
                </div>
                <div>  
                    {isValid && (
                        <img
                         src={product.imageLink}
                         alt={product.productName}
                         onError={handleImageError} // Call handleImageError when image fails to load
                       />
                    )}
                    <h2>{product.productName}</h2>
                    <h3>{product.productDescription}</h3>
                    <p>Price: {product.price}</p>
                    <button onClick={handleAddToCart}>Add to Cart</button>
                    <button onClick={handleEdit}>Edit</button>
                </div>
            </div>
        </div>)
    );
};

export default ProductDetails;