import React,{useEffect,useState} from 'react'
import {Card,Container,Button,Col,Row} from 'react-bootstrap';
import image from '../../../assets/images/a.jpg'


import './instrutor.css'
import axiosInstance from '../../../AxiosEndPoint/axiosEnd';
import { toast } from 'react-toastify';
const Instrutor = () => {
  const [instructor,setInstructor]=useState([])
  useEffect(()=>{
    axiosInstance.get('/student/allTutors')
    .then((response)=>{
      setInstructor(response.data.allInstrcutor)
    })
    .catch((err)=>{
      toast.error(err)
    })


    
  },[])
  return (
    <div>
         <section className='instructor'>
      <h1 className='text-center mt-5 card-head'>Manin INSTRCUTOR</h1>
    <Container className='mt-5 '>
      <Row className='ms-4 '>
        {instructor.slice(0,3).map((instructor)=>(
           <Col xs={12} md={4}  className='instructor-card '>
           <Card className='ms-5' style={{ width: '18rem' }}>
         <Card.Img variant="top" src={image} />
         <Card.Body>
           <Card.Title className='card-title text-center card-head'>{instructor.instrctorname}</Card.Title>
          
           <Button className='card-button ms-5'>Go somewhere</Button>
         </Card.Body>
       </Card>
             
           </Col>

        ))}
       
       
        
      </Row>
    </Container>
    </section>
      
    </div>
  )
}

export default Instrutor
