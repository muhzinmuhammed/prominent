

import {Card,Container,Button,Col,Row} from 'react-bootstrap';
import './cards.css'

function Cards() {
  return (
    <section>
      <h1 className='text-center mt-5 card-head'>Trending Course</h1>
    <Container className='mt-5'>
      <Row className='ms-5'>
        <Col xs={12} md={4} >
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://e1.pxfuel.com/desktop-wallpaper/506/510/desktop-wallpaper-mern-stack-full-stack-developer.jpg" />
      <Card.Body>
        <Card.Title className='card-title text-center'>Mern</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button className='card-button ms-5'>Go somewhere</Button>
      </Card.Body>
    </Card>
          
        </Col>
        <Col xs={12} md={4}>
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://e1.pxfuel.com/desktop-wallpaper/506/510/desktop-wallpaper-mern-stack-full-stack-developer.jpg" />
      <Card.Body>
        <Card.Title className='card-title text-center '>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button className='card-button text-center ms-5'>Go somewhere</Button>
      </Card.Body>
    </Card>
          
        </Col>
        <Col xs={12} md={3}>
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://e1.pxfuel.com/desktop-wallpaper/506/510/desktop-wallpaper-mern-stack-full-stack-developer.jpg" />
      <Card.Body>
        <Card.Title className='card-title text-center'>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button className='card-button ms-5'>Go somewhere</Button>
      </Card.Body>
    </Card>
          
        </Col>
      </Row>
    </Container>
    </section>
    
  );
}

export default Cards;
