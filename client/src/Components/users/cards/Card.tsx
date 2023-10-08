import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
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
  const [searchQuery, setSearchQuery] = useState(""); // Step 1: Search query state

  useEffect(() => {
    axiosInstance
      .get("/student/allCourses")
      .then((response) => {
        console.log(response.data);

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
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  // Step 2: Filter courses based on search query
  const filteredCourses = course.filter((course) =>
    course.coursename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section>
      <h1 className="text-center mt-5 card-head">Trending Course</h1>
      <Container>
        <Form className="d-flex mx-auto">
          {" "}
          {/* Center the search box */}
          <Form.Control
            type="search"
            placeholder="Search Courses"
            className="search"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form>

        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          
        >
          {filteredCourses.map((course) => (
            <div
              className="card mt-5 "
              style={{ marginRight: "30px", borderRadius: "10px", height:'580px' }}
              key={course.id}
            >
              <Link style={{ textDecoration: "none" }} to={`/course_details/${course._id}`}>
                <img
                  style={{ height: "300px", width: "100%" }}
                  className="product--image"
                  src={`${baseUrl}/${course.photo}`}
                  alt="a"
                />
                <h2 className="text-center mt-5">{course.coursename}</h2>
                <p className="text-dark mt-3">
                  <b>{course.coursedescription}</b>
                </p>
                <small className="text-dark mt-5 ms-3">
                  {course.instructor.instrctorname}
                </small>

                <h4 className="price text-center">₹ {course.coursefee}</h4>
              </Link>
            </div>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}

export default Cards;
