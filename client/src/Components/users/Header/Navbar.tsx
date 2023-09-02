import React from 'react'; // Don't forget to import React
import { Nav, Navbar, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice/userSlice';
import './Navbar.css';

function NavbarHeader() {
  const user = useSelector(selectUser);
  
  return (
    <Navbar expand="lg" bg="white">
      <Container>
        <Navbar.Brand href="#home" className="logo me-5">
          Prominent
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className="me-5 navbar-item">
              Home
            </Nav.Link>
            <Nav.Link href="#link" className="me-5 navbar-item">
              Courses
            </Nav.Link>
            <Nav.Link href="#link" className="me-5 navbar-item">
              Tutors
            </Nav.Link>
            <Nav.Link href="#link" className="me-5 navbar-item">
              Communnity
            </Nav.Link>
            <Nav.Link href="#link" className="me-5 navbar-item">
              Contact
            </Nav.Link>
          </Nav>

          <Nav>
            {user ? (
              <span className="me-3">Welcome, {user.name}</span>
            ) : (
              <>
                <Link to="/login">
                  <Button className="button me-4">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="button me-3">SignUp</Button>
                </Link>
                <Link to="/tutor_login">
                  <Button className="button me-3">Instructor Login</Button>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarHeader;
