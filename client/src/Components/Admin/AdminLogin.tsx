
import { Form, Card, Container, Button } from 'react-bootstrap';
import './AdminLogin.css'
import { Link,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import {toast,ToastContainer} from 'react-toastify'
import {  useDispatch,useSelector } from 'react-redux'
import { login,selectTutor } from '../../features/tutorSlice/tutorSlice';
import axios from 'axios'

function TutorLogin() {
  const user = useSelector(selectTutor);
  const [adminEmail, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const dispatch = useDispatch()
  const navigate=useNavigate()

  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const trimmedEmail = adminEmail.trim();
    const trimmedPassword = password.trim();
    
    if (
      
      trimmedEmail === "" ||
    
      trimmedPassword === ""
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      const response = await  axios.post('http://localhost:5000/admin/adminlogin',  {
       
      adminname: trimmedEmail,
       
      password: trimmedPassword,
      });
      
      

     
dispatch(login(response.data)); 

   
      toast.success("User created successfully.");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred.");
    }
  }
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate, user]);
  return (
  
   
         <div className="bg-light vh-100 d-flex justify-content-center align-items-center">
          <ToastContainer/>
      <Container >
      <div className="d-flex justify-content-center">
        <Card className="p-5 shadow w-50">
          <h2 className="mb-4 heading text-center">Prominent</h2>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email"  value={adminEmail}
                  onChange={(e) => setEmail(e.target.value)} />
              
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password"  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>

            

            <Button  type="submit" className="w-25 ">
              Log In
            </Button>
          </Form>
          <div className="mt-3">
    <p className="mb-0">
              Don't have an account?      <Link to='/tutor_signup'> Sign up</Link> 
            </p>
            <p>
              
            </p>
          </div>
        </Card>
        </div>
      </Container>
    </div>
  );
}

export default TutorLogin;
