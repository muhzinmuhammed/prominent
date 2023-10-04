import  { useState, useEffect } from "react";
import { Form, Card, Container, Button, Col, Row } from "react-bootstrap";
import {toast,ToastContainer} from 'react-toastify'


import image from "../../../assets/images/b.jpg";
import NavbarHeader from "../Header/Navbar";
import { Link, useNavigate } from "react-router-dom";

import axiosInstance from "../../../AxiosEndPoint/axiosEnd";

function NewPassword() {
  
  const [password, setPassword] = useState("");
 
  const navigate = useNavigate();
const userEmail=localStorage.getItem('useremail')
console.log(userEmail,"ll");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const trimmedPassword = password.trim();
    if (trimmedPassword === "") {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      const response = await axiosInstance.post("/student/newpassword", {
        studentemail: userEmail,
        password: trimmedPassword,
      });
  
     

    
      navigate("/login");

     
    } catch (error) {
      console.error(error);
      toast.error("User is blocked or please correct password");
    }
  };
  

  return (
    <div>
      <NavbarHeader />
      <ToastContainer />

      <Container fluid style={{ marginTop: "200px" }}>
        <Row>
          <Col xs={12} md={6}>
            <img style={{ width: "100%" }} src={image} alt="kk" />
          </Col>
          <Col className="ll" xs={12} md={6}>
            <Card>
              <Card.Body
                style={{ height: "320px", backgroundColor: "#1eb2a6 " }}
              >
                <Form onSubmit={(e) => handleSubmit(e)}>
                  

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="email">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "  #fff ",
                      border: "none",
                      color: "  #1eb2a6 ",
                      marginLeft: "200px",
                      marginTop: "30px",
                    }}
                    className="w-50"
                  >
                    Log In
                  </Button>
                 
                </Form>
                <Link style={{ textDecoration: 'none' ,color:'#fff' }} to={'/forget_password'} >Forgot PassWord </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NewPassword;
