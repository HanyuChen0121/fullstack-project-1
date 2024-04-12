import React, { useState } from 'react';
const CreateProduct = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [category, setCategory] = useState("Category 1");
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
        
        try{
            const response = await fetch('http://localhost:5000/api/products/create', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ productName, productDescription, category, price, stockQuantity, imageLink })
            });
    
            const data = await response.json();
            setProductName('');
            setProductDescription('');
            setCategory('');
            setPrice('');
            setStockQuantity('');
            setImageLink('');
            setImagePreview(null);
          } catch (error) {
            console.log(error);
          }
    };

    return (
        <div className="flex">
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