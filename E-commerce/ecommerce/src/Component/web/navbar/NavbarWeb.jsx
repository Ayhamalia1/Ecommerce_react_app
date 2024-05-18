import React, { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import img from '../../../../public/images/logo-free-img.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext/UserContext';
import { useQuery } from 'react-query';
import { IoCartSharp } from "react-icons/io5";
import { CartContext } from '../cart/Cart';



export default function NavbarWeb() {
  let navigate=useNavigate()
  const token =localStorage.getItem('token')
  
  function logout(){
    localStorage.removeItem('token')
    setUser(null)    
  }
 
    const {UserData}=useContext(UserContext);
    const {count}=useContext(CartContext)
  const {data}=useQuery("userData",UserData)
 






  return (
    <Navbar expand="lg" className="bg-body-tertiary nav">
      <Container>
        <Navbar.Brand href="#home"><img src={img}></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link  ><NavLink className="navLink" to="">Home</NavLink></Nav.Link>
            <Nav.Link ><NavLink className="navLink" to="categories">Categories</NavLink></Nav.Link>

            {!token ? <>
              <NavDropdown className='dropdown' title={data &&data? data.user.userName : "Account"} id="basic-nav-dropdown">
                <NavDropdown.Item >
                  <NavLink to="login">Log in</NavLink >
                </NavDropdown.Item>
                <NavDropdown.Item >
                  <NavLink to='register'>
                    Register
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            </> :
              <NavDropdown className='dropdown' title={ data &&data? data.user.userName : "Account"} id="basic-nav-dropdown">
                <NavDropdown.Item href="proflie">Profile</NavDropdown.Item>
                <NavDropdown.Item href="login" onClick={logout}>logout</NavDropdown.Item>
              </NavDropdown>}
              {token ?
              <Nav.Link  ><NavLink className="navLink d-flex gap-2" to="cart"> <div className='redCart'>{count}</div> <IoCartSharp className='mt-1 fs-5'/>cart</NavLink></Nav.Link>:
              ""}


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};