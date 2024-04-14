import React, { useState } from 'react';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
const CreateProduct = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [category, setCategory] = useState("Category 1");
    const [price, setPrice] = useState('');
    const [isPriceValid, setPriceValid] = useState(true);
    const [stockQuantity, setStockQuantity] = useState('');
    const [isStockQuantityValid, setIsStockQuantityValid] = useState(true);
    const [imageLink, setImageLink] = useState('');
    const [isImageValid, setIsImageValid] = useState(true);
    const [isNameValid, setNameIsValid] = useState(true)
    const [nameError, setNameError] = useState('');
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    const handleImageError = () => {
        setIsImageValid(false); // Set isValid state to false when image fails to load
    };

    const handleNameChange = (e) => {
        const name = e.target.value.trim();
        const nameRegex = /^[A-Za-z0-9 ]+$/;
        setNameIsValid(nameRegex.test(name));
        if (isNameValid) {
            setProductName(e.target.value)
            setNameError('')
        } else {
            setNameError('Please Enter valid product name with letters and numbers')
        }
    }
    const handleStockChange = (e) => {
        const stock = e.target.value;
        if (!isNaN(stock)) {
            // Update the stock state only if the input is a number
            setStockQuantity(stock); 
            setIsStockQuantityValid(true)
        } else {
            setIsStockQuantityValid(false)
        }
    }
    const handlePriceChange = (e) => {
        const price = e.target.value;
        if (!isNaN(price)) {
            // Update the stock state only if the input is a number
            setPrice(price); 
            setPriceValid(true)
        } else {
            setPriceValid(false)
        }
    }
    const handleUploadClick = async () => {
        if (!isNameValid || !isStockQuantityValid || !isPriceValid || !productName || !price || !imageLink || !stockQuantity) {
            console.log(isImageValid)
            console.log(isNameValid)
            console.log(isStockQuantityValid)
            console.log(isPriceValid)
            console.log(productName)
            console.log(price)
            console.log(imageLink)
            console.log(stockQuantity)
            setShowError(true);
            return;
        }
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
            navigate('/');
          } catch (error) {
            setShowError(true);
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
                onChange={handleNameChange}
                placeholder="Enter userName"
                className = {nameError ? 'inValidInput' : ''}
            />
            <br />
            {nameError && <p style={{ color: 'red' }}>{nameError}</p>}

            <label>Product Description:</label>
            <textarea
                value={productDescription}
                placeholder="Enter description"
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
                type="text"
                value={price}
                onChange={handlePriceChange}
                placeholder="Enter Price"
            />
            {!isPriceValid && (
                <p style={{color:'red'}}>Please enter a number</p>
            )}
            <br />

            <label>In Stock Quantity:</label>
            <input
                type="text"
                value={stockQuantity}
                onChange={handleStockChange}
                placeholder="Enter stock quantity"
            />
            {!isStockQuantityValid && (
                <p style={{color:'red'}}>Please enter a number</p>
            )}
            <br />

            <label>Add Image Link:</label>
            <input
                type="text"
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
                placeholder='Enter img url'
            />
            <br />

            
            <br />
            
            {imageLink && (<img
                src={imageLink}
                alt={productName}
                onError={handleImageError} // Call handleImageError when image fails to load
            />)}
             {imageLink && !isImageValid && (
                <div style={{color: 'red'}}>
                    <p>Please Enter a valid image Link</p>
                </div>
            )}
            {!imageLink && (
                <div style={{ border: '2px dashed gray', padding: '20px', width: '400px'}} className = "flex">
                    
                    <p>Please upload an image.</p>
                
                </div>
            )}
            <br />

            <button onClick={handleUploadClick}>Add Product</button>
            {showError && (
                <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                <Alert.Heading>Error</Alert.Heading>
                <p>Failed to add product. Please try again.</p>
                </Alert>
            )}
        </div>
    );
};

export default CreateProduct;