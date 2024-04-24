import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../index.css';
import Cart from './Cart';
import { connect } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Prev } from 'react-bootstrap/esm/PageItem';
const ProductList = ({cartItems}) => {

    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);
    const [cartItem, setCartItem] = useState([]); // State to manage cart items
    const [showCart, setShowCart] = useState(false); // State to control cart modal visibility
    const { userId } = useSelector(state => state.auth);

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
    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        setCurrentPage(Math.ceil(products.length / productsPerPage));
    };
    const onClickAddProductButton = () => {
        navigate('/CreateProduct');
    }
    const handleEditClick = (product) => {
        // Navigate to the edit product page
        navigate(`/product/edit/${product._id}`);
      };
    const getCartItemQuantity = (id) => {
        const existingItemIndex = cartItems.findIndex(item => item.product._id === id);
        if (existingItemIndex !== -1) {
            return cartItems[existingItemIndex].quantity;
        }
        return 0;
    }
    const handleDecreaseQuantity = (product) => {
        const existingItemIndex = cartItems.findIndex(item => item.product._id === product._id);

        // Decrease quantity by 1 if greater than 1
        if (existingItemIndex !== -1 && cartItems[existingItemIndex].quantity > 0) {
            dispatch(addToCart(product, -1));
        }
    };

    const handleIncreaseQuantity = (product) => {
        // Increase quantity by 1
        dispatch(addToCart(product, 1));
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
            <Cart cartItems={cartItem} show={showCart} handleClose={handleCloseCart} />
            <div className="product-grid" >
                {currentProducts.map((product) => (
                    <div key={product._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                        <Link to={`/product/${product._id}`}>
                            <img style={{margin: '5px'}} src={product.imageLink} alt={product.name} />
                        </Link>
                        <p>{product.productName}</p>
                        
                        <p style={{fontWeight: 'bold'}}>${product.price}</p>
                        <button className="product-button" onClick={() => handleIncreaseQuantity(product)}>+</button>
                        <span style={{ margin: '5px' }}>{getCartItemQuantity(product._id)}</span>
                        <button className="product-button" onClick={() => handleDecreaseQuantity(product)}>-</button>
                        {userId && (<button className="product-button" onClick={() => handleEditClick(product)}>Edit</button>) }
                    </div>
                ))}
            </div>
            <ul className="pagination">
                <li>
                    <button className="product-button" onClick={handleFirstPage}> &lt;&lt;</button>
                </li>
                {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
                    <li key={index}>
                        <button className="product-button"onClick={() => paginate(index + 1)}>{index + 1}</button>
                    </li>
                ))}
                <li>
                    <button className="product-button" onClick={handleLastPage}>&gt;&gt;</button>
                </li>
            </ul>
            
        </div>
        ) :
        (<div>Loading</div>)
    );
};
const mapDispatchToProps = {
    addToCart,
};
const mapStateToProps = (state) => {
    return {
        cartItems: state.cart.cartItems,
        totalPrice: state.cart.totalPrice,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);