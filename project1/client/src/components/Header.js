import {React, useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeUser } from '../actions/authActions';
import { Navbar, Nav, Container} from 'react-bootstrap';
import { connect } from 'react-redux';
import Cart from '../pages/Cart'; 
import '../index.css';
const Header = ({ totalPrice}) => {

  // Use useSelector hook to get the state
  const { userId } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);

  const handleOpenCart = () => {
    setShowCart(true);
  };

  // Function to close cart modal
  const handleCloseCart = () => {
    setShowCart(false);
  };
  const handleSubmit = async (e) =>{
    e.preventDefault();

    dispatch(removeUser());
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="/">Management Chwua</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"> </Nav>

            <Nav>
              <button className="product-button" variant="primary" onClick={handleOpenCart}>Cart</button>
              {totalPrice ? (<span className="header-cart-text flex">${totalPrice}</span>) : ''}
              {userId ? (<Nav.Link className="ms-auto" onClick={handleSubmit} >Sign Out</Nav.Link>) : 
                        (<Nav.Link className="ms-auto" href="/signin">Sign In</Nav.Link>)}
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Cart show={showCart} handleClose={handleCloseCart} />
    </div>
  );

};
const mapStateToProps = (state) => {
  return {
      totalPrice: state.cart.totalPrice,
  };
};
export default connect(mapStateToProps, null)(Header);
