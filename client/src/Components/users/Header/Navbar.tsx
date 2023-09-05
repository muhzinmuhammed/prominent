import React, { useState } from 'react';
import { Nav, Navbar, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { AiOutlineSearch } from 'react-icons/ai';
import './Navbar.css';

function NavbarHeader() {
  const [searchValue, setSearchValue] = useState('');

  // Function to handle changes in the search input
  const handleSearchInputChange = (event:string) => {
    setSearchValue(event.target.value);
  };

  // Function to toggle the visibility of the search icon
  const toggleSearchIconVisibility = () => {
    return searchValue ? 'none' : 'block';
  };

  return (
    <Navbar fixed='top' expand="lg" className="header">
      <Container >
        <Navbar.Brand className='logo' href="#">
          Prominent
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 ms-5  "
            style={{ maxHeight: '400px' }}
            navbarScroll
          >
            <Nav.Link className='ms-5 nav-class ' href="#action1">Home</Nav.Link>
            <Nav.Link className='ms-5 nav-class' href="#action2">Courses</Nav.Link>
            <Nav.Link className='ms-5 nav-class' href="#action2">Tutors</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <div className="d-flex">
        <Form className="d-flex ">
          <Form.Control
            type="search"
            placeholder="Search"
            className="search"
            aria-label="Search"
            value={searchValue}
            onChange={handleSearchInputChange}
          />
          <AiOutlineSearch
            className="search-icon"
            style={{ display: toggleSearchIconVisibility() }}
          />
        </Form>
        <Button className='button1 me-3'>Login</Button>
        <Button className='button2 me-3'>Sign Up</Button>
      </div>
    </Navbar>
  );
}

export default NavbarHeader;