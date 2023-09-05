import React from 'react'
import {Card,Container,Button,Col,Row} from 'react-bootstrap';
import image from '../../../assets/images/a.jpg'

import './instrutor.css'
const Instrutor = () => {
  return (
    <div>
         <section className='instructor'>
      <h1 className='text-center mt-5 card-head'>Manin INSTRCUTOR</h1>
    <Container className='mt-5 '>
      <Row>
        <Col xs={12} md={4}>
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title className='card-title text-center'>Mern</Card.Title>
       
        <Button className='card-button'>Go somewhere</Button>
      </Card.Body>
    </Card>
          
        </Col>
        <Col xs={12} md={4}>
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image}/>
      <Card.Body>
        <Card.Title className='card-title text-center '>Card Title</Card.Title>
       
        <Button className='card-button text-center'>Go somewhere</Button>
      </Card.Body>
    </Card>
          
        </Col>
        <Col xs={12} md={3}>
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image}/>
      <Card.Body>
        <Card.Title className='card-title text-center'>Card Title</Card.Title>
       
        <Button className='card-button text-center'>Go somewhere</Button>
      </Card.Body>
    </Card>
          
        </Col>
      </Row>
    </Container>
    </section>
      
    </div>
  )
}

export default Instrutor
