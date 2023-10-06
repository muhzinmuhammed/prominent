import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { AiOutlineSearch } from "react-icons/ai";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  logout,
  selectUser,
  signup,
} from "../../../features/userSlice/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function NavbarHeader() {
  const [searchValue, setSearchValue] = useState("");
  const user = useSelector(selectUser);
  const dispatch = useDispatch();


  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    const parsedUserData = JSON.parse(storedUserData);

    dispatch(signup(parsedUserData));
  }, [dispatch]);


 
  // Function to handle changes in the search input
  const handleSearchInputChange = (event: string) => {
    setSearchValue(event.target.value);
  };

  const hanldeSignout = () => {
    localStorage.clear("userData");
    dispatch(logout());
  };
  // Function to toggle the visibility of the search icon
  const toggleSearchIconVisibility = () => {
    return searchValue ? "none" : "block";
  };

  return (
    <Navbar fixed="top" expand="lg" className="header">
      <Container>
        <Navbar.Brand className="logo" href="#">
          Prominent
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 ms-5  "
            style={{ maxHeight: "400px" }}
            navbarScroll
          >
            <Nav.Link className="ms-5 nav-class " href="/">
              Home
            </Nav.Link>
            <Nav.Link className="ms-5 nav-class" href="/courses">
              Courses
            </Nav.Link>
            <Nav.Link className="ms-5 nav-class" href="/tutors">
              Tutors
            </Nav.Link>
            
          </Nav>
          {user ? (
          <>
          <Nav.Link className="me-5 nav-class" href="/message">
              Chat
            </Nav.Link>
          <Nav.Link className="me-5 nav-class" href="/wallet">
              Wallet
            </Nav.Link>
            <h6 className="me-5">{user.name}</h6>
            <Link style={{textDecoration:'none', marginRight:'20px',marginBottom:'10px'}} to={'/join_room'}>Online Meet</Link>
           
            <Button  style={{textDecoration:'none', marginRight:'20px',marginBottom:'10px'}} onClick={hanldeSignout} className="buton1">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              {" "}
              <Button className="button1 ">Login</Button>
            </Link>
            <Link to="/signup">
              {" "}
              <Button className="button2 ">Sign Up</Button>{" "}
            </Link>
          </>
        )}
        </Navbar.Collapse>
      </Container>

      <div className="d-flex">
        
        
      </div>
    </Navbar>
  );
}

export default NavbarHeader;
