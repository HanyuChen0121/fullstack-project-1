import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products/all');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <h1>Product List</h1>
            {currentProducts.map((product) => (
                <div key={product._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                    <img src={product.image} alt={product.name} style={{ width: '200px', height: '200px' }} />
                    <h3>{product.name}</h3>
                    <p>Price: ${product.price}</p>
                    <button onClick={() => console.log('Add', product)}>Add</button>
                    <button onClick={() => console.log('Edit', product)}>Edit</button>
                </div>
            ))}
            <ul className="pagination">
                {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
                    <li key={index}>
                        <button onClick={() => paginate(index + 1)}>{index + 1}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;