// AddCourse.jsx

import { Col, Row } from 'react-bootstrap';
import SideNav from '../../Components/tutor/SideNavbar/SideNav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './AddCourse.css'; // Import your custom CSS file

const AddCourse = () => {
  return (
    <div>
      <Row>
        <Col xs={12} md={1}>
          <SideNav />
        </Col>
        <Col className="d-flex align-items-center ms-3 vh-50" xs={12} md={10}>
          <Form className="custom-form">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default AddCourse;
