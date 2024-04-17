import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../index.css';
import Cart from './Cart';
import { connect } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { useDispatch } from 'react-redux';

const ProductList = () => {

    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);
    const [cartItems, setCartItems] = useState([]); // State to manage cart items
    const [showCart, setShowCart] = useState(false); // State to control cart modal visibility
    const [quantity, setQuantity] = useState(0);
    const handleDecreaseQuantity = () => {
        // Decrease quantity by 1 if greater than 1
        if (quantity >= 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncreaseQuantity = () => {
        // Increase quantity by 1
        setQuantity(quantity + 1);
    };
    // Function to open cart modal
    const handleOpenCart = () => {
        setShowCart(true);
    };

    // Function to close cart modal
    const handleCloseCart = () => {
        setShowCart(false);
    };
    useEffect(() => {
    const fetchData = async () => {
        
        try{
            const response = await fetch('http://localhost:5000/api/products/all', {
              method: 'GET',
            });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
            if (contentType && contentType.indexOf('application/json') !== -1) {
                const data = await response.json();
                setProducts(data);
                
            } else {
                throw new Error('Response is not in JSON format.');
            }
     
          } catch (error) {
          
            console.log(error);
          }
        
        };
        fetchData();
    }, []);
    
    /** */
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = Array.isArray(products) ? products.slice(indexOfFirstProduct, indexOfLastProduct) : [];
    const navigate = useNavigate();

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const onClickAddProduct = (product) => {
        console.log("printing productproduct");
        console.log(product);
        dispatch(addToCart(product));;
    }
    const onClickAddProductButton = () => {
        navigate('/CreateProduct');
    }
    const handleEditClick = (product) => {
        // Navigate to the edit product page
        navigate(`/product/edit/${product._id}`);
      };
    return (
        products.length > 0 ? (
        <div className="flex" >
            <h1>Products</h1>
            <button className="product-button" style={{float: 'right'}} onClick={onClickAddProductButton}> Add product </button>
            <button className="product-button" onClick={handleOpenCart}>
                Open Cart
            </button>

            {/* Cart modal */}
            <Cart cartItems={cartItems} show={showCart} handleClose={handleCloseCart} />
            <div className="product-grid" >
                {currentProducts.map((product) => (
                    <div key={product._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                        <Link to={`/product/${product._id}`}>
                            <img style={{margin: '5px'}} src={product.imageLink} alt={product.name} />
                        </Link>
                        <p>{product.productName}</p>
                        <p style={{fontWeight: 'bold'}}>${product.price}</p>
                        <button className="product-button" onClick={() => onClickAddProduct(product)}>Add</button>
                        <button className="product-button" onClick={ () => handleEditClick(product)}>Edit</button>
                    </div>
                ))}
            </div>
            <ul className="pagination">
                {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
                    <li key={index}>
                        <button className="product-button"onClick={() => paginate(index + 1)}>{index + 1}</button>
                    </li>
                ))}
            </ul>
            
        </div>
        ) :
        (<div>error</div>)
    );
};
const mapDispatchToProps = {
    addToCart,
};
export default connect(null, mapDispatchToProps)(ProductList);