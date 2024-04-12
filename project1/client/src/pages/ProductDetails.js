import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDetails = ({ products }) => {
    const [product, setProduct] = useState(null);



    const handleAddToCart = () => {
        // Add to cart logic here
        console.log('Product added to cart:', product);
    };

    const handleEdit = () => {
        // Edit product logic here
        console.log('Edit product:', product);
    };

    return (
        <div>
            <h1>Product Detail</h1>
            <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '20px' }}>
                    <img src={product.imageLink} alt={products.imageLink} style={{ width: '200px', height: '200px' }} />
                </div>
                <div>
                    <h2>{product.productName}</h2>
                    <h3>{product.productDescription}</h3>
                    <p>Price: {product.price}</p>
                    <button onClick={handleAddToCart}>Add to Cart</button>
                    <button onClick={handleEdit}>Edit</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;