import React,{useEffect} from "react";
import "./Coursedetails.css";
import { useParams } from "react-router-dom";
import { Badge, Accordion } from "react-bootstrap";
import image from "../../../assets/images/mum.jpg";
import axiosInstance from "../../../AxiosEndPoint/axiosEnd";
const CourseDetails = () => {
  const { id } = useParams();
  useEffect(()=>{
    axiosInstance.get()
  })

  
  
  return (
    <div className="conatiner ">
      <section className="course-details  ">
        <div className="container">
          <div
            className="border-course ms-5 "
            style={{
              width: "18rem",
              backgroundColor: "rgb(244,245,247)",
              color: "rgb(127,134,139)",
            }}
          >
            <p className="text-center"> Courses /{id}</p>
          </div>
          <div className="container course-image mt-5 me-5">
            <img src={image} className="img-fluid" alt="..." />
          </div>
          <div className="contaier">
            <h1 className="text-center mt-5"style={{color:"rgb(0,0,0)"}}>
              Complete JavaScript Course for Beginners
            </h1>
            <h5 className="text-color">
              This course is designed for absolute beginners who want to learn
              JavaScript programming. You'll start with the basics of JavaScript
              syntax and gradually move to more advanced concepts. By the end of
              the course, you'll have built several mini-projects to showcase
              your skills. Enroll today and become a confident JavaScript
              developer!
            </h5>
            <h4>
              Difficuly:
              <Badge bg="success" className="ms-3 mt-3">
                easy
              </Badge>
            </h4>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-4">
              <h1>Instructor</h1>
              <p>Jhon Dhon</p>
            </div>
            <div className="col-lg-4">
              <h1>Instructor</h1>
              <p>Jhon Dhon</p>
            </div>
            <div className="col-lg-4">
              <h1>Instructor</h1>
              <p>Jhon Dhon</p>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <h1>Syullbus</h1>

          <Accordion defaultActiveKey="0" className="mt-5 bg-danger">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Accordion Item #1</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Accordion Item #2</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div className="container">
          <h3 className="mt-5">About this course</h3>
          <div className="about-box">
            Learn JavaScript from scratch with this comprehensive
            beginner-friendly course. JavaScript is the language of the web, and
            this course will teach you how to create interactive web
            applications. No prior programming experience required. Join now and
            start your journey into web development!
          </div>
        </div>
        <div className="container">
          <h3 className="mt-5">Requirements</h3>
          <div className="about-box">
          <ul>
            <li>
            No prior programming experience required</li>
            <li>
            Access to a computer with an internet connection</li>
            <li>
            Curiosity and eagerness to learn</li></ul>  
          </div>
          <button className="btn btn-info float-end mt-5">ENTROLL NOW</button>
        </div>
       
      </section>
    </div>
  );
};

export default CourseDetails;
