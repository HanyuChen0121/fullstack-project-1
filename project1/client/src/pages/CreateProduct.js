import React, { useState } from 'react';
import axios from 'axios';
const CreateProduct = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadClick = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/products', {
                productName,
                productDescription,
                category,
                price,
                stockQuantity,
                imageLink,
                imagePreview, // Assuming you want to store the image preview as well
            });
            console.log('Product uploaded:', response.data);
            // Reset form fields after successful upload
            setProductName('');
            setProductDescription('');
            setCategory('');
            setPrice('');
            setStockQuantity('');
            setImageLink('');
            setImagePreview(null);
        } catch (error) {
            console.error('Error uploading product:', error);
        }
    };

    return (
        <div>
            <h1>Create Product</h1>
            <label>Product Name:</label>
            <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
            />
            <br />

            <label>Product Description:</label>
            <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
            />
            <br />

            <label>Category:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
                {/* Add more categories as needed */}
            </select>
            <br />

            <label>Price:</label>
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <br />

            <label>In Stock Quantity:</label>
            <input
                type="number"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
            />
            <br />

            <label>Add Image Link:</label>
            <input
                type="text"
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
            />
            <br />

            <label>Upload Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <br />
            {imagePreview && (
                <img src={imagePreview} alt="Product Preview" style={{ width: '200px' }} />
            )}
            <br />

            <button onClick={handleUploadClick}>Upload</button>
        </div>
    );
};

export default CreateProduct;