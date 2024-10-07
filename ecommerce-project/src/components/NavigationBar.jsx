import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar bg='light' expand="md">
      <Navbar.Brand href='/'>E-Commerce App</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className='ms-auto'>
          <Nav.Link as={NavLink} to="/" activeclassname="active">Home</Nav.Link>

          <NavDropdown title="Customers" id="basic-nav-dropdown">
            <NavDropdown.Item>
              <Nav.Link as={NavLink} to="/customers" activeclassname="active">List of Customers</Nav.Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Nav.Link as={NavLink} to="/add-customers" activeclassname="active">Add Customer</Nav.Link>
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Products" id="basic-nav-dropdown">
            <NavDropdown.Item>
              <Nav.Link as={NavLink} to="/product-catalog" activeclassname="active">Product Catalog</Nav.Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Nav.Link as={NavLink} to="/add-product" activeclassname="active">Add Product</Nav.Link>
            </NavDropdown.Item>
          </NavDropdown>
          

          <Nav.Link as={NavLink} to="/track-order-status" activeclassname="active">Track Order Status</Nav.Link>

          <NavDropdown title="Account" id="basic-nav-dropdown">
            <NavDropdown.Item>
              <Nav.Link as={NavLink} to="/sign-up" activeclassname="active">Sign Up</Nav.Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Nav.Link as={NavLink} to="/login" activeclassname="active">Login</Nav.Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;