// Navbar.js
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './Navbar.css';

import logo from '../assets/images/logo1.png'

const CustomNavbar = () => {
  return (
    <Navbar className="custom-navbar" expand="lg">
      <Navbar.Brand href="/">
        <img src={logo} alt="Logo" className="logo" />
      </Navbar.Brand>
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default CustomNavbar;
