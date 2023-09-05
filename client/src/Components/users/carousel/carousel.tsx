
  import {Carousel,Card,Button} from 'react-bootstrap';
  import carouselImage1 from '../../../assets/images/carousel.jpg';
  
  import carouselImage3 from '../../../assets/images/mum.jpg';
  import './carousal.css'

  function Home() {
    return (
      <Carousel className='mt-5' interval={5000}> 
        <Carousel.Item>
          <img className='image-carousel' src={carouselImage1} alt="First slide" style={{ width: '100%',height:'500px' }} />
          <Carousel.Caption >
          
      
          
  <Button className="btn button ">View Courses</Button>
 


            
          
          </Carousel.Caption>
        </Carousel.Item>
       
        <Carousel.Item>
          <img className='image-carousel' src={carouselImage3} alt="Third slide" style={{ width: '100%',height:'500px' }} />
          <Carousel.Caption>
          <Button className="btn button ">View Courses</Button>
          </Carousel.Caption>
        </Carousel.Item>
       
      </Carousel>
    );
  }

  export default Home;
