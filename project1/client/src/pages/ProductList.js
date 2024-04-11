import React, { useState, useEffect } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const getData = async () => {
        
        try{
            const response = await fetch('http://localhost:5000/api/products/getAllProducts', {
              method: 'GET',
            });
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const contentType = response.headers.get('content-type');
            if (contentType && contentType.indexOf('application/json') !== -1) {
                const data = await response.json();
                setProducts(data.products);
            } else {
                throw new Error('Response is not in JSON format.');
            }

        setLoading(false);
          } catch (error) {
            setError(error.message);
            console.log(error);
          }
    };
    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    getData();
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