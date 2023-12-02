import React, { useEffect, useState } from 'react';
import './HeaderComponent.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'
function HeaderComponent() {
    // const history = useHistory();

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if(userInfo){
        setIsAdmin(userInfo.isAdmin)
        console.log(JSON.stringify(userInfo))
      }
    }, []);

    useEffect(() => {
      console.log(isAdmin);
    }, [isAdmin]);
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
              <Nav.Link href = '/public-lists'>
              <Link to = '/public-lists'>
                Public Lists
                </Link>
              </Nav.Link>
              <Nav.Link href = '/hero-search'>
              <Link to = '/hero-search'>
                Search Heroes
                </Link>
              </Nav.Link>
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item href="/my-profile">My Profile</NavDropdown.Item>
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
            {isAdmin ? (
               <>
                 <Nav.Link href = '/admin'>
                 <Link to = '/admin'>
                   Admin Terminal
                   </Link>
                 </Nav.Link>
                 <Nav.Link id='admin-label'>
                   Server Access Granted 
                 </Nav.Link>
               </>
            ):null}
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderComponent;