import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDetails = ({ productId }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Fetch product data from MongoDB using Axios
        axios.get(`http://localhost:5000/api/products/${productId}`)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });
    }, [productId]);

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