
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';
import { Link } from 'react-router-dom';
import './Navbar.css'


function NavbarHeader() {
  return (
    <Navbar expand="lg"  bg='white' >
        <Container>
    
        <Navbar.Brand  href="#home" className='logo me-5'>Prominent</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto "> 
            <Nav.Link href="#home"className="me-5 navbar-item">Home</Nav.Link>
            <Nav.Link href="#link"className="me-5 navbar-item">Courses</Nav.Link>
            <Nav.Link href="#link"className="me-5 navbar-item">Tutors</Nav.Link>
            <Nav.Link href="#link"className="me-5 navbar-item">Communnity</Nav.Link>
            <Nav.Link href="#link"className="me-5 navbar-item">Contact</Nav.Link>
           
          </Nav>
         
          <Nav>
          <Link to="/login"> <Button   className='  button me-4'>Login</Button></Link>
        <Button className=' button me-3'>SignUp</Button>
        </Nav>
        </Navbar.Collapse>
        </Container>
      
    </Navbar>
    
  );
}

export default NavbarHeader;