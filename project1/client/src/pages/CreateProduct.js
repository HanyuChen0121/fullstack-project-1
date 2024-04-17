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
    const [isNameValid, setIsNameValid] = useState(true); // Changed from setNameIsValid to setIsNameValid
    const [nameError, setNameError] = useState('');
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const handleImageError = () => {
        setIsImageValid(false); // Set isValid state to false when image fails to load
    };
    
    const handleNameChange = (e) => {
        const name = e.target.value.trim();
        const nameRegex = /^[A-Za-z0-9 ]+$/;
        setIsNameValid(nameRegex.test(name)); // Changed from setNameIsValid to setIsNameValid
        if (isNameValid) {
            setProductName(e.target.value);
            setNameError('');
        } else {
            setNameError('Please Enter valid product name with letters and numbers');
        }
    };

    const handleStockChange = (e) => {
        const stock = e.target.value;
        if (!isNaN(stock)) {
            // Update the stock state only if the input is a number
            setStockQuantity(stock); 
            setIsStockQuantityValid(true);
        } else {
            setIsStockQuantityValid(false);
        }
    };

    const handlePriceChange = (e) => {
        const price = e.target.value;
        if (!isNaN(price)) {
            // Update the stock state only if the input is a number
            setPrice(price); 
            setPriceValid(true);
        } else {
            setPriceValid(false);
        }
    };

    const handleUploadClick = async () => {
        if (!isNameValid || !isStockQuantityValid || !isPriceValid || !productName || !price || !imageLink || !stockQuantity) {
            setShowError(true);
            return;
        }
        try {
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
            <div>Product Name:</div>
            <div>
                <input
                    type="text"
                    value={productName}
                    onChange={handleNameChange}
                    placeholder="Enter productName"
                    className={nameError ? 'inValidInput' : ''}
                    style={{ width: '50%', padding: '10px' }}
                />
            </div>
            <br />
            {nameError && <p style={{ color: 'red' }}>{nameError}</p>}

            <div>Product Description:</div>
            
            <textarea
                value={productDescription}
                placeholder="Enter description"
                onChange={(e) => setProductDescription(e.target.value)}
                rows={5} // Set the number of rows
                cols={50} // Set the number of columns
                style={{ width: '50%', padding: '10px' }}
            />
            <br />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '20px' }}>
                    <div style={{ marginBottom: '3px' }}>Category:</div>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="category1">Category 1</option>
                        <option value="category2">Category 2</option>
                        {/* Add more categories as needed */}
                    </select>
                </div>
                <div>
                    <div>Price</div>
                    <input
                        type="text"
                        value={price}
                        onChange={handlePriceChange}
                        placeholder="Enter Price"
                    />
                    {!isPriceValid && (
                        <p style={{color:'red'}}>Please enter a number</p>
                    )}
                </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: "40px"}}>
                <div style={{ marginRight: '20px' }}>
                    <div style={{ marginBottom: '3px' }}>In Stock Quantity:</div>
                        <input
                            type="text"
                            value={stockQuantity}
                            onChange={handleStockChange}
                            placeholder="Enter stock quantity"
                        />
                        {!isStockQuantityValid && (
                            <p style={{color:'red'}}>Please enter a number</p>
                        )}
                </div>
                <div>
                    <div>Add Image Link:</div>
                    <input
                        type="text"
                        value={imageLink}
                        onChange={(e) => setImageLink(e.target.value)}
                        placeholder='Enter img url'
                    />
                  
                </div>
                
            </div>
            <div style={{marginTop: '10px'}}>
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
            </div>         
            <button onClick={handleUploadClick} className='product-button'>Add Product</button>
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
