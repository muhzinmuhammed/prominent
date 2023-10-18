import  { useState } from "react";
import { Form, Card, Container, Button, Col, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";



import NavbarHeader from "../Header/Navbar";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../../../AxiosEndPoint/axiosEnd";

function ForgetPassword() {
  const [studentemail, setEmail] = useState("");
  
 const navigate=useNavigate()

 const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const trimmedEmail = studentemail.trim();
   localStorage.setItem("useremail",trimmedEmail)
    if (trimmedEmail === "" ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
       await axiosInstance.post("/student/forget_password", {
        studentemail: trimmedEmail,
        
      });
      
      navigate('/user_forget_otp')
      
      

      
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
            <img style={{ width: "100%",height:'66%' }} src='https://images.unsplash.com/photo-1504203700686-f21e703e5f1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGFzc3dvcmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' alt="kk" />
          </Col>
          <Col className="ll" xs={12} md={6}>
            <Card>
              <Card.Body
                style={{ height: "320px", backgroundColor: "#1eb2a6 " }}
              >
                <Form onSubmit={(e) => handleSubmit(e)}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="email">Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={studentemail}
                      onChange={(e) => setEmail(e.target.value)}
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
                 Submit
                  </Button>
                 
                </Form>
                
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ForgetPassword;
