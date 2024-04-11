import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDetails = ({ productId }) => {
    const [product, setProduct] = useState(null);

    const handle = async(e) => {
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:5000/api/all', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password })
            });
    
            const data = await response.json();
            
    
          } catch (error) {
            console.log(error);
          }
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    const { image, category, name, price, description } = product;

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
                    <img src={image} alt={name} style={{ width: '200px', height: '200px' }} />
                </div>
                <div>
                    <h2>{category}</h2>
                    <h3>{name}</h3>
                    <p>Price: ${price}</p>
                    <p>{description}</p>
                    <button onClick={handleAddToCart}>Add to Cart</button>
                    <button onClick={handleEdit}>Edit</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;