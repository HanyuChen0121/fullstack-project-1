import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeUser } from '../actions/authActions';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  // Use useSelector hook to get the state
  const { userId, token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    dispatch(removeUser());
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">Management Chwua</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/signin">Sign In</Nav.Link>
            <Nav.Link onClick={handleSubmit}>Sign Out</Nav.Link> */}

            {userId ? (<Nav.Link onClick={handleSubmit}>Sign Out</Nav.Link>) : (<Nav.Link href="/signin">Sign In</Nav.Link>)}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

};

export default Header;
