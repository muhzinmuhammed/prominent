
import { Form, Card, Container, Button } from 'react-bootstrap';
import './LOgin.css'

function Login() {
  return (
  
   
         <div className="bg-light vh-100 d-flex justify-content-center align-items-center">
      <Container >
      <div className="d-flex justify-content-center">
        <Card className="p-5 shadow w-50">
          <h2 className="mb-4 heading text-center">Prominet</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            

            <Button  type="submit" className="w-25 ">
              Log In
            </Button>
          </Form>
          <div className="mt-3">
            <p className="mb-0">
              Don't have an account? <a href="#">Sign up</a>
            </p>
            <p>
              <a href="#">Forgot password?</a>
            </p>
          </div>
        </Card>
        </div>
      </Container>
    </div>
  );
}

export default Login;
