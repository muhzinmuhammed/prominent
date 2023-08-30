
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './cards.css'

function Cards() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <h1 style={{marginTop:'100px'}} >Trending course</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', marginTop: '90px' }}>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="https://miro.medium.com/v2/resize:fit:678/1*l2tlJsFNg2tH6QizegKkqA.png" />
          <Card.Body>
            <Card.Title>Card Title 1</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem', border:'black' }}>
          <Card.Img variant="top" src="https://miro.medium.com/v2/resize:fit:678/1*l2tlJsFNg2tH6QizegKkqA.png" />
          <Card.Body>
            <Card.Title>Card Title 2</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="https://miro.medium.com/v2/resize:fit:678/1*l2tlJsFNg2tH6QizegKkqA.png" />
          <Card.Body>
            <Card.Title>Card Title 3</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Cards;
