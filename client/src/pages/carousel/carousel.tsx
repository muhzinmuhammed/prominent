
import Carousel from 'react-bootstrap/Carousel';
import carouselImage from '../../assets/images/carousel.jpg';

function Home() {
  return (
    <Carousel className='mt-5' interval={1000}> {/* Set interval to 3000 milliseconds (3 seconds) */}
      <Carousel.Item>
        <img className='image-carousel' src={carouselImage} alt="First slide" style={{ width: '100%' }} />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className='image-carousel' src={carouselImage} alt="Second slide" style={{ width: '100%' }} />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className='image-carousel' src={carouselImage} alt="Third slide" style={{ width: '100%' }} />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Home;
