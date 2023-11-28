import React from 'react';
import './HeaderComponent.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'
function HeaderComponent() {
    // const history = useHistory();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
        <Link to = '/'>
        Superhero App
                </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href = '/mylists'>
              <Link to = '/mylists'>
                My Lists
                </Link>
              </Nav.Link>
              <Nav.Link href = '/hero-search'>
              <Link to = '/hero-search'>
                Search Heroes
                </Link>
              </Nav.Link>
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
              <NavDropdown.Item
               onClick={()=>{
                localStorage.removeItem('userInfo')
                // history.push('/')
                window.location.reload()
                }}
                href="/"
            >
                Logout
              </NavDropdown.Item>
            
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderComponent;