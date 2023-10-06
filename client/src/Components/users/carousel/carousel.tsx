import React from 'react';
import { Carousel } from 'react-bootstrap';
import animation from '../../../assets/video/animation.mp4';
import './carousal.css';

function Home() {
  return (
   
     
    <video
  className='center'
  src={animation}
  
  autoPlay
  loop 
  style={{
    width: "100%",
    height: "700px",
    marginTop: '200px',
  }}
></video>


      
          
  );
}

export default Home;
