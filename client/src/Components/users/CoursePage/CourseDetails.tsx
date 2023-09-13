import React,{useEffect, useState} from "react";
import "./Coursedetails.css";
import { useParams } from "react-router-dom";
import { Badge, Accordion } from "react-bootstrap";
import image from "../../../assets/images/mum.jpg";
import axiosInstance from "../../../AxiosEndPoint/axiosEnd";
const CourseDetails = () => {
  const baseUrl =
  "http://res.cloudinary.com/dfnwvbiyy/image/upload/v1694269781";
  const baseVideo="https://res.cloudinary.com/dfnwvbiyy/video/upload/v1694365110/"
  const { id } = useParams();
  const [lessons,setLessons]=useState([])
console.log(id,"ll");

  useEffect(()=>{
    axiosInstance.get(`/student/allLessons/${id}`)
    .then((response)=>{
      console.log(response);
      
      
      setLessons(response.data.lessons)
      
      

    })
  },[id])
  

  
  
  return (
    <div className="conatiner ">
     {lessons.map((lesson)=>(
      <section className="course-details  ">
       
        
      <div  className="container">
        <div
          className="border-course ms-5 "
          style={{
            width: "18rem",
            backgroundColor: "rgb(244,245,247)",
            color: "rgb(127,134,139)",
          }}
        >
          {/* <p className="text-center"> Courses /{id}</p> */}
        </div>
        <div className="container course-image mt-5 me-5">
          <img src={`${baseUrl}/${lesson.coursename.photo}`} className="img-fluid" alt="..."  />
        </div>
        <div className="contaier">
          
              <h1 className="text-center mt-5"style={{color:"rgb(0,0,0)"}}>
            
            </h1>

          
        
          <h5 className="text-color">
           {lesson.coursename.coursename}
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
            <p>{lesson.instructor?.instrctorname}</p>
          </div>
          <div className="col-lg-4">
            <h1>Duration</h1>
            <p>{lesson.duration} week</p>
          </div>
          <div className="col-lg-4">
            <h1>Price</h1>
            <p>₹{lesson.coursename.coursefee}</p>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <h1>Syullbus</h1>

        <Accordion defaultActiveKey="0" className="mt-5 bg-danger">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Module 1: Introduction to the Course</Accordion.Header>
            <Accordion.Body>
            Getting Started with HTML
            <video src={`${baseVideo}/${lesson.video}`} controls style={{width:"100px", height:"200px",marginLeft:"100px"}}>
           
  </video>
           
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Accordion Item #2</Accordion.Header>
            <Accordion.Body>
        
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
          
          ))}
      
    </div>
  );
};

export default CourseDetails;
