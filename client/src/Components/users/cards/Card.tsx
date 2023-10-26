import  { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import "./cards.css";
import axiosInstance from "../../../AxiosEndPoint/axiosEnd";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface Course {
  _id: string;
  coursename: string;
  coursedescription: string;
  coursefee: number;
  photo: string;
  instructor: {
    instrctorname: string;
  };
}

function Cards() {
  const baseUrl =
    "http://res.cloudinary.com/dfnwvbiyy/image/upload/v1694269781";
  const [course, setCourse] = useState<Course[]>([]); // Provide type annotation for course
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    axiosInstance
      .get("/student/allCourses")
      .then((response) => {
       

        setCourse(response.data?.allCourse);
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

  const filteredCourses = course?.filter((course) =>
    course?.coursename?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  return (
    <section>
      
    </section>
  );
}

export default Cards;
