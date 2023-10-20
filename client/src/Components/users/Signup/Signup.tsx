import React, { useState } from "react";
import { Form, Card, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import NavbarHeader from "../Header/Navbar";

import axiosInstance from "../../../AxiosEndPoint/axiosEnd";

function Signup() {
  const [studentname, setName] = useState("");
  const [studentemail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const isStrongPassword = (password: string): boolean => {
    // Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
  };

  const isPhoneNumberValid = (phone: string): boolean => {
    // Phone number validation using a simple regex for demonstration purposes.
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const isNameValid = (studentname: string): boolean => {
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return nameRegex.test(studentname);
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
if (!isNameValid(trimmedName)) {
  toast.error('Please correct name')
  
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

    if (!isPhoneNumberValid(trimmedPhone)) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    try {
      const response = await axiosInstance.post('/student/register', {
        studentname: trimmedName,
        studentemail: trimmedEmail,
        phone: trimmedPhone,
        password: trimmedPassword,
      });
      console.log(response.data);
      
      navigate('/user_otp');
    } catch (error) {
      console.error('An error occurred while registering:',);
      toast.error("An error occurred.");
    }
  };

  return (
   
      <div className="bg-light vh-100 d-flex justify-content-center align-items-center">
        <NavbarHeader />
        <ToastContainer />
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
                      setPhone(e.target.value)
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

                <button type="submit" className="btn btn-info btn-lg btn-block">Register</button>
               
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
    
  );
}

export default Signup;
