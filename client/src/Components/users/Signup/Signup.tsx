import React, { useState,useEffect } from "react";
import { Form, Card, Container, Button } from "react-bootstrap";
import { Link,useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {  useSelector } from 'react-redux'
import { selectUser, signup } from '../../../features/userSlice/userSlice';
import NavbarHeader from "../Header/Navbar";
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import axiosInstance from "../../../AxiosEndPoint/axiosEnd";


function Signup() {
  const user = useSelector(selectUser);
  const [studentname, setName] = useState(""); // Initialize state with an empty string
  const [studentemail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  
 
  const navigate = useNavigate();
  const isStrongPassword = (password: string): boolean => {
    // Implement your password strength validation logic here
    return password.length >= 8;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = studentname.trim();
    const trimmedEmail = studentemail.trim();
    const trimmedPhone = phone.trim();
    const trimmedPassword = password.trim();

    if (
      trimmedName === "" ||
      trimmedEmail === "" ||
      trimmedPhone === "" ||
      trimmedPassword === ""
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!isStrongPassword(trimmedPassword)) {
      toast.error(
        "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters."
      );
      return;
    }

    if (password !== confirmpassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await axiosInstance.post('/student/register', {
        studentname: trimmedName,
        studentemail: trimmedEmail,
        phone: trimmedPhone,
        password: trimmedPassword,
      });
      navigate('/user_otp');  
     
    } catch (error) {
      console.error('An error occurred while registering:', error.message);
      toast.error("An error occurred.");
    }
  };

 
  return (
    <GoogleOAuthProvider clientId="276728749610-fu7kbfh7hol05pl9plf83eqokglu4srd.apps.googleusercontent.com">
   
    <div className="bg-light vh-100 d-flex justify-content-center align-items-center">
      <NavbarHeader/>
       <ToastContainer/>
      <Container>
        <div className="d-flex justify-content-center mt-5">
          <Card className="p-5 shadow w-50">
            <h2 className="mb-4 heading text-center">Prominent</h2>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please Enter Your Full Name"
                  value={studentname}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={studentemail}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter Phone Number"
                  value={phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPhone((e.target.value))
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Re-Password"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              <Button type="submit" className="w-25">
                Sign Up
              </Button>
              <GoogleLogin 
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
            </Form>
            <div className="mt-3">
              <p className="mb-0">
                Already have an account? <Link to={"/login"}>Login</Link>
              </p>
            </div>
          </Card>
        </div>
      </Container>
    </div>
    </GoogleOAuthProvider>
  );
}

export default Signup;
