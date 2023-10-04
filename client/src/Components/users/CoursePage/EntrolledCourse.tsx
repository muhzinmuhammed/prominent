import React, { useEffect, useState } from "react";
import "./Coursedetails.css";
import { useParams } from "react-router-dom";
import { Badge, Accordion } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../AxiosEndPoint/axiosEnd";
import { toast } from "react-toastify";
import NavbarHeader from "../Header/Navbar";
const EntrolledCourse = () => {
  const baseUrl =
    "http://res.cloudinary.com/dfnwvbiyy/image/upload/v1694269781";
  const baseVideo =
    "https://res.cloudinary.com/dfnwvbiyy/video/upload/v1694365110/";
  const { id } = useParams();
 const navigate=useNavigate()
  const [entrolled, setEntrolled] = useState([]);

  const [lessons, setLessons] = useState([]);
  const studentsname = localStorage.getItem("userData");
  const student = JSON.parse(studentsname);
  const [review, setReview] = useState("");
  const [showReview, setShowReview] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/student/entrolledcourseDetails/${id}`)
      .then((response) => {
        setEntrolled(response.data.entrolled);
      });
  }, [id]);


  const courseId = entrolled.length >= 0 ? entrolled[0]?.courseId._id : null;
 

  const reviewAdd = async () => {
    await axiosInstance.post("/student/addreview", {
      studentId: student._id,
      courseId: courseId,

      review: review,
    });
  };

  useEffect(() => {
    axiosInstance.get(`/student/getreview/${id}`).then((response) => {
      setShowReview(response.data.review);
    });
  }, []);
  const retutnCourse = async () => {
    await axiosInstance
      .post(`/student/course_refund/${id}`)
      .then((response) => {
       toast.success('fund refunded')
       navigate('/courses')
      }).catch((err)=>{
        toast.error(err)
      })
  };

  useEffect(() => {
    axiosInstance.get(`/student/entrolledlessons/${id}`).then((response) => {
      setLessons(response.data.lessons);
    });
  }, [id]);

  return (
    <>
    <NavbarHeader/>
    <div className="conatiner ">
      {lessons.map((lesson) => (
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
              
            </div>
            <div className="container course-image mt-5 me-5">
              <img
                src={`${baseUrl}/${lesson.courseId.photo}`}
                className="img-fluid"
                alt="..."
              />
            </div>
            <div className="contaier">
              <h1
                className="text-center mt-5"
                style={{ color: "rgb(0,0,0)" }}
              ></h1>

              <h5 className="text-color">{lesson.courseId.coursename}</h5>
              <h4>
                Difficuly:
                <Badge bg="success" className="ms-3 mt-3">
                  easy
                </Badge>
              </h4>
            </div>
          </div>
          <button className="btn btn-info ms-5 mt-5" onClick={retutnCourse}>
            {" "}
            Return course
          </button>
          <div className="container mt-5">
            <div className="row">
              <div className="col-lg-4">
                <h1>Instructor</h1>
                <p>{lesson.instructorId?.instrctorname}</p>
              </div>
              <div className="col-lg-4">
                <h1>Duration</h1>
                <p>{lesson.duration} week</p>
              </div>
              <div className="col-lg-4">
                <h1>Price</h1>
                <p>₹{lesson.courseId.coursefee}</p>
              </div>
            </div>
          </div>
          <div className="container mt-5">
            <h1>Syullbus</h1>

            <Accordion defaultActiveKey="0" className="mt-5 bg-danger">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  Module 1: Introduction to the Course
                </Accordion.Header>
                <Accordion.Body>
                  Getting Started with HTML
                  <video
                    src={`${baseVideo}/${lesson.video}`}
                    controls
                    style={{
                      width: "100px",
                      height: "200px",
                      marginLeft: "100px",
                    }}
                  ></video>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Accordion Item #2</Accordion.Header>
                <Accordion.Body></Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          <div className="container">
            <h3 className="mt-5">About this course</h3>
            <div className="about-box">
              Learn JavaScript from scratch with this comprehensive
              beginner-friendly course. JavaScript is the language of the web,
              and this course will teach you how to create interactive web
              applications. No prior programming experience required. Join now
              and start your journey into web development!
            </div>
          </div>
          <div className="container">
            <h3 className="mt-5">Requirements</h3>
            <div className="about-box">
              <ul>
                <li>No prior programming experience required</li>
                <li>Access to a computer with an internet connection</li>
                <li>Curiosity and eagerness to learn</li>
              </ul>
            </div>
          </div>
          <div className="about-box">
            <h1>Review of Course</h1>
            {showReview.map((review) => (
              <>
                <div className="container">
                  <h4>{review.studentId.studentname}</h4>
                  <h6 key={review._id}>{review.review}</h6>
                </div>
              </>
            ))}
          </div>

          <h1 className="ms-5">Enter Your Review</h1>
          <form onSubmit={reviewAdd} className="about-box ms-5 mb-3">
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="ms-5 mb-3"
              name=""
              id=""
              cols="50"
              rows="4"
              placeholder="Enter your course review"
            ></textarea>
            <button type="submit" className="btn btn-info text-white">
              Submit
            </button>
          </form>
          
        </section>
      ))}
    </div>
    </>
  );
};

export default EntrolledCourse;
