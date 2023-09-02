import React, { useState,useEffect } from "react";
import { Form, Card, Container, Button } from "react-bootstrap";
import { Link,useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {  useDispatch,useSelector } from 'react-redux'
import { selectTutor, signup } from '../../../features/tutorSlice/tutorSlice';
function TutorSignup() {
  const user = useSelector(selectTutor);
  const [instrctorname, setName] = useState(""); // Initialize state with an empty string
  const [instrctoremail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState(" ");
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const isStrongPassword = (password: string): boolean => {
    // Implement your password strength validation logic here
    return password.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = instrctorname.trim();
    const trimmedEmail = instrctoremail.trim();
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
      const response = await  axios.post('http://localhost:5000/instructor/register',  {
        instrctorname: trimmedName,
        instrctoremail: trimmedEmail,
        phone: trimmedPhone,
        password: trimmedPassword,
      });
      
      

     
dispatch(signup(response.data)); 

   
      toast.success("User created successfully.");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred.");
    }
  };
  useEffect(() => {
    if (user) {
      navigate('/tutor_home');
    }
  }, [navigate, user]);

  return (
   
    <div className="bg-light vh-100 d-flex justify-content-center align-items-center">
       <ToastContainer/>
      <Container>
        <div className="d-flex justify-content-center">
          <Card className="p-5 shadow w-50">
            <h2 className="mb-4 heading text-center">Prominent</h2>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please Enter Your Full Name"
                  value={instrctorname}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={instrctoremail}
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
            </Form>
            <div className="mt-3">
              <p className="mb-0">
                Already have an account? <Link to={"/tutor_login"}>Login</Link>
              </p>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default TutorSignup;
