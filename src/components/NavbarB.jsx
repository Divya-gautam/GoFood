import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Cart from "../screens/Cart";
import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Modal from "../Modal";
import { useCart } from "./ContextReducer";


export default function CustomNavbar() {
  const [cartView,setCartView] = useState(false)
  let data = useCart();

  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the authToken from localStorage
    localStorage.removeItem("authToken");
    // Redirect to the login page
    navigate("/Login");
    console.log("logged out")
  };

//  const handleCart = (e)=> {
//     e.preventDefault();
//     console.log("my Cart")
//  }

  return (
    <Navbar bg="success" expand="lg">
      <Navbar.Brand className=" navbar-brand  fs-1 fst-italic">
        <Link to="" className="navbar-brand fs-1 fst-italic">GoFood</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        <Nav className="me-auto">
          <Nav.Link className="fs-5" as={Link} to="/">
            Home
          </Nav.Link>
          {localStorage.getItem("authToken") && (
            <Nav.Link className="fs-5" as={Link} to="">
              My Orders
            </Nav.Link> 
          )}
        </Nav>
        <Nav>
          {!localStorage.getItem("authToken") ? (
            <>
              <Button className="bg-white text-success mx-1" as={Link} to="/Login">
                Login
              </Button>
              <Button className="bg-white text-success mx-1" as={Link} to="/creatuser">
                Signup
              </Button>
            </>
          ) : (
            <div >
              <Button variant="light" className="text-success bg-white mx-2" onClick={()=>{setCartView(true)}}>
                My Cart
                <Badge pill bg = "danger" >{data.length}</Badge>
              </Button>
{cartView? <Modal onClose = {()=>{setCartView(false)}} ><Cart/> </Modal>:null}              
              <Button onClick={handleLogout} variant="light" className="text-danger bg-white">
                Logout
              </Button>
            </div>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
