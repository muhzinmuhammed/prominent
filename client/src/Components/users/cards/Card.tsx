import React, { useEffect, useState } from "react";
import { Card, Container, Button, Col, Row } from "react-bootstrap";
import "./cards.css";
import axiosInstance from "../../../AxiosEndPoint/axiosEnd";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Cards() {
  const baseUrl =
    "http://res.cloudinary.com/dfnwvbiyy/image/upload/v1694269781";
  const [course, setCourse] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/student/allCourses")
      .then((response) => {
        
        
        setCourse(response.data.allCourse);
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.log(error);
      });
  }, []);


  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <section>
      <h1 className="text-center mt-5 card-head">Trending Course</h1>
<Container>


      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={false} // Set this to true if you want auto-play
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {
  course.map((course) => (
    <div className="card" key={course.id}>
      <img className="product--image" src={`${baseUrl}/${course.photo}`} alt="a" />
      <h2>{course.coursename}</h2>
      <p className="price">{course.coursefee}</p>
      <p>{course.coursedescrption}</p>
    </div>
  ))
}
        
       
        
        
      </Carousel>
      </Container>
    </section>
  );
}

export default Cards;
