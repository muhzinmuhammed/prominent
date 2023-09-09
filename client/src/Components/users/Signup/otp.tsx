import React, { useState } from 'react';
import { Col, Row, Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { selectUser,signup } from '../../../features/userSlice/userSlice';
const UserOtp = () => {
  
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:5000/student/signup_verify', {
      otp,
    });
   


    

    // Check the response status and handle success or error accordingly
    if (response.status === 200) {
      toast.success('Signup successful');
      const userdata=response.data
      localStorage.setItem('userData', JSON.stringify(userdata));

      
      dispatch(signup(userdata))

      dispatch(signup(response.data)); 
      navigate('/');
    } else {
      // If the response contains a data property with an error message, use it; otherwise, provide a generic error message
      const errorMessage = response.data && response.data.message ? response.data.message : 'An error occurred';
      toast.error(errorMessage);
    }
  } catch (error) {
    console.error('An error occurred while verifying OTP:', error);
    toast.error('An error occurred'); // Display a generic error message
  }
};


  return (
    <div className="bg-light vh-100 d-flex justify-content-center align-items-center">
      <Container>
        <ToastContainer/>
        <Row className="d-flex justify-content-center mt-5">
          <Col xs={4}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicOTP">
                <Form.Label>Enter OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" className="w-100">
                Submit
              </Button>
            </Form>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserOtp;
