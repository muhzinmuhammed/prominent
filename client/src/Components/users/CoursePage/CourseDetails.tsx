import React, { useEffect, useState } from "react";
import "./Coursedetails.css";
import { useParams } from "react-router-dom";
import { Badge, Accordion } from "react-bootstrap";

import axiosInstance from "../../../AxiosEndPoint/axiosEnd";
import { toast,ToastContainer } from "react-toastify";

const CourseDetails = () => {
  const baseUrl =
    "http://res.cloudinary.com/dfnwvbiyy/image/upload/v1694269781";
  const baseVideo =
    "https://res.cloudinary.com/dfnwvbiyy/video/upload/v1694365110/";
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const studentsname = localStorage.getItem("userData");
  const student = JSON.parse(studentsname);
  const [showReview, setShowReview] = useState([]);

  useEffect(() => {
    axiosInstance.get(`/student/getreview/${id}`).then((response) => {
      setShowReview(response.data.review);
    });
  }, [id]);

  useEffect(() => {
    axiosInstance.get(`/student/allLessons/${id}`).then((response) => {
      if (response.data.course) {
        console.log(response.data,"lll");
        
        setCourse(response.data.course);
      }
    });
  }, [id]);

  const initPayment = async (data) => {
    try {
      const response = await axiosInstance.post("/student/create-payment", {
        amount: data.amount,
        coursename: id,
        studentname: student._id,
      });

      if (response.status === 200) {
        const options = {
          key: "rzp_test_mEetqy2BIAhoF3",
          amount: data.amount,
          currency: data.currency,
          description: "Test Transaction",
          order_id: data.id,
          handler: async (response) => {
            try {
              const { datas } = await axiosInstance.post('/student/verify', {
                response,
                studentname: student._id,
                coursename: id,
                amount: data.amount,
              });
              console.log(datas);
            } catch (error) {
              console.log(error);
            }
          },
          theme: {
            color: "#1eb2a6",
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        toast.error('Already Buying This Course');
      }
    } catch (error) {
      toast.error('Already Buying This Course');
    }
  };
  

  const handleSubmit = async () => {
    if (course) {
      const prices = course?.coursefee;

      try {
        const response = await axiosInstance.post("/student/create-payment", {
          amount: prices,
          coursename: id,
          studentname: student._id,
        });

        if (response.status === 200) {
          initPayment(response.data.data);
        } else {
          toast.error('Already Buying This Course');
        }
      } catch (error) {
        toast.error('Already Buying This Course');
      }
    }
  };

  return (
    <div className="container">
      <ToastContainer/>
      {course && (
        <section className="course-details">
          <div className="container">
            <div
              className="border-course ms-5"
              style={{
                width: "18rem",
                backgroundColor: "rgb(244,245,247)",
                color: "rgb(127,134,139)",
              }}
            >
              {/* <p className="text-center"> Courses /{id}</p> */}
            </div>
            <div className="container course-image mt-5 me-5">
              <img
                src={`${baseUrl}/${course.photo}`}
                className="img-fluid w-100"
                alt="..."
              />
            </div>
            
            <div className="container">
              <h1 className="text-center mt-5" style={{ color: "rgb(0,0,0)" }}>
                {/* Course Title */}
                {course.coursename}
              </h1>

              <h5 className="text-color">Course Name: {course.coursename}</h5>
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
            <p>{course.instructor?.instrctorname}</p>
          </div>
          <div className="col-lg-4">
            <h1>Duration</h1>
            <p>{course.duration} week</p>
          </div>
          <div className="col-lg-4">
            <h1>Price</h1>
            <p>₹{course.coursefee}</p>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <h1>Syullbus</h1>
        
        {course?.courseLessons?.map((lesson, index) => (
  <Accordion key={index} defaultActiveKey="0" className="mt-5 bg-danger">
    <Accordion.Item eventKey="0">
      <Accordion.Header>Module {index + 1}</Accordion.Header>
      <Accordion.Body> {lesson.title}</Accordion.Body>
      <Accordion.Body>
        {index === 0 && lesson.video && (
          <video
            src={`${baseVideo}/${lesson.video}`}
            controls
            style={{ width: "100%", height: "100px" }}
          >
           
          </video>
        )}
      </Accordion.Body>
    </Accordion.Item>
  </Accordion>
))}


      </div>
          <div className="container">
            <h3 className="mt-5">About this course</h3>
            <p>{course.coursedescription}</p>
          </div>
          <div className="container">
            <h3 className="mt-5">Requirements</h3>
            {/* Render Requirements here */}
            <ul>
              <li>No prior programming experience required</li>
              <li>Access to a computer with an internet connection</li>
              <li>Curiosity and eagerness to learn</li>
            </ul>
           
          </div>
          <button
  className="btn btn-info float-end mt-5"
  onClick={() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      handleSubmit()
    } else {
      alert("Please login");
    }
   
  }}
>
  ENROLL NOW
</button>
        </section>
      )}
    </div>
  );
};

export default CourseDetails;
