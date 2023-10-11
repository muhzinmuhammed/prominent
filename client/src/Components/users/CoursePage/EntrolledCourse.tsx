import React, { useEffect, useState } from "react";
import "./Coursedetails.css";
import { Link, useParams } from "react-router-dom";
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
  console.log(id);

  const navigate = useNavigate();

  const [newLessons, setNewLessons] = useState([]);
  const studentsname = localStorage.getItem("userData");
  const student = JSON.parse(studentsname);
  const [review, setReview] = useState("");
  const [showReview, setShowReview] = useState([]);
const courseId=newLessons.courseId?._id

  
  const reviewAdd = async () => {
    await axiosInstance.post("/student/addreview", {
      studentId: student._id,
      courseId: courseId,

      review: review,
    });
  };

  useEffect(() => {
    axiosInstance.get(`/student/getreview/${id}`).then((response) => {
      console.log(response.data,"lll");
      
      
      setShowReview(response.data.review);
    });
  }, []);
  const retutnCourse = async () => {
    await axiosInstance
      .post(`/student/course_refund/${id}`)
      .then((response) => {
        toast.success("fund refunded");
        navigate("/courses");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  useEffect(() => {
    axiosInstance.get(`/student/entrolledlessons/${id}`).then((response) => {
      console.log(response.data, "iiiii");


      setNewLessons(response.data.lessons);
    });
  }, [id]);


  return (
    <>
      <NavbarHeader />
      <div className="conatiner ">
        {newLessons && (
          <section className="course-details  ">
            <div className="container">
              <div
                className="border-course ms-5 "
                style={{
                  width: "18rem",
                  backgroundColor: "rgb(244,245,247)",
                  color: "rgb(127,134,139)",
                }}
              ></div>
              <div className="container course-image mt-5 me-5">
                <img
                  src={`${baseUrl}/${newLessons.courseId?.photo}`}
                  className="img-fluid w-100"
                  alt="kk"
                />
              </div>
              <div className="contaier">
                <h1
                  className="text-center mt-5"
                  style={{ color: "rgb(0,0,0)" }}
                ></h1>

                <h1 className="text-dark text-center ">{newLessons.courseId?.coursename}</h1>
                <h4>
                  Difficuly:
                  <Badge bg="success" className="ms-3 mt-3">
                   {newLessons.courseId?.courseLevel}
                  </Badge>
                </h4>
              </div>
            </div>
           <div className="row">
            <div className="col-lg-8 ms-5">
            <button className="btn btn-info buy-button ms-5 mt-5" onClick={retutnCourse}>
              {" "}
              Return course
            </button>
            </div>
            <div className="col-lg-2">
            <Link to={`/certificates/${id}`}>
              <button className="btn btn-info buy-button ms-5 mt-5">Certificate</button>
            </Link>
            </div>
           </div>
            
            <div className="container mt-5">
              <div className="row">
                <div className="col-lg-4">
                  <h1>Instructor</h1>
                  <h4>{newLessons.instructorId?.instrctorname}</h4>
                </div>
                <div className="col-lg-4">
                  <h1>Duration</h1>
                  <h4>{newLessons.courseId?.duration} week</h4>
                </div>
                <div className="col-lg-4">
                  <h1>Price</h1>
                  <h4>₹{newLessons.courseId?.coursefee}</h4>
                </div>
              </div>
            </div>
            <div className="container mt-5">
        <h1>Syullbus</h1>
        
        {newLessons.courseId?.courseLessons?.map((lesson, index) => (
  <Accordion key={index} defaultActiveKey="0" className="mt-5 bg-danger">
    <Accordion.Item eventKey="0">
      <Accordion.Header>Module {index + 1}</Accordion.Header>
      <Accordion.Body> {lesson.title}</Accordion.Body>
      <Accordion.Body>
      
          <video
            src={`${baseVideo}/${lesson.video}`}
            controls
            style={{ width: "100%", height: "100px" }}
          >
           
          </video>
   
      </Accordion.Body>
    </Accordion.Item>
  </Accordion>
))}


      </div>
            <div className="container">
            <div className="about-box">
              <h1>Review of Course</h1>
              {showReview.map((review) => (
                <>
                  <div className="container">
                    <h4>{review.studentId?.studentname}</h4>
                    <h6 key={review._id}>{review.review}</h6>
                  </div>
                </>
              ))}
            </div>

            </div>
            
<div className="container">
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

</div>
            
          </section>
        )}
      </div>
    </>
  );
};

export default EntrolledCourse;
