/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import "./Coursedetails.css";
import { Link, useParams } from "react-router-dom";
import { Badge, Accordion } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../AxiosEndPoint/axiosEnd";
import { toast } from "react-toastify";
import NavbarHeader from "../Header/Navbar";

const EntrolledCourse: React.FC = () => {
  const baseUrl =
    "http://res.cloudinary.com/dfnwvbiyy/image/upload/v1694269781";
  const baseVideo =
    "https://res.cloudinary.com/dfnwvbiyy/video/upload/v1694365110/";
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [newLessons, setNewLessons] = useState<any>(null); // Replace 'any' with the actual type
  const studentsname = localStorage.getItem("userData");
  const student = studentsname ? JSON.parse(studentsname) : null;
  const [review, setReview] = useState<string>("");
  const [showReview, setShowReview] = useState<any[]>([]); // Replace 'any' with the actual type
  const courseId = newLessons?.courseId?._id;

  const reviewAdd = async () => {
    if (student && courseId) {
      await axiosInstance.post("/student/addreview", {
        studentId: student._id,
        courseId: courseId,
        review: review,
      });
    }
  };

  useEffect(() => {
    axiosInstance.get(`/student/getreview/${id}`).then((response) => {
      setShowReview(response.data.review);
    });
  }, [id]);

  const retutnCourse = async () => {
    await axiosInstance
      .post(`/student/course_refund/${id}`)
      .then(() => {
        toast.success("Fund refunded");
        navigate("/courses");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  useEffect(() => {
    axiosInstance.get(`/student/entrolledlessons/${id}`).then((response) => {
      setNewLessons(response.data.lessons);
    });
  }, [id]);

  return (
    <>
      <NavbarHeader />
      <div className="container">
        {newLessons && (
          <section className="course-details">
            <div className="container">
              <div
                className="border-course ms-5"
                style={{
                  width: "18rem",
                  backgroundColor: "rgb(244,245,247)",
                  color: "rgb(127,134,139)",
                }}
              ></div>
              <div className="container course-image mt-5 me-5">
                <img
                  src={`${baseUrl}/${newLessons?.courseId?.photo}`}
                  className="img-fluid w-100"
                  alt="Course"
                />
              </div>
              <div className="container">
                <h1 className="text-dark text-center">
                  {newLessons?.courseId?.coursename}
                </h1>
                <h4>
                  Difficulty:
                  <Badge bg="success" className="ms-3 mt-3">
                    {newLessons?.courseId?.courseLevel}
                  </Badge>
                </h4>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 ms-5">
                <button
                  className="btn btn-info buy-button ms-5 mt-5"
                  onClick={retutnCourse}
                >
                  Return course
                </button>
              </div>
              <div className="col-lg-2">
                <Link to={`/certificates/${id}`}>
                  <button className="btn btn-info buy-button ms-5 mt-5">
                    Certificate
                  </button>
                </Link>
              </div>
            </div>
            <div className="container mt-5">
              <div className="row">
                <div className="col-lg-4">
                  <h1>Instructor</h1>
                  <h4>{newLessons?.instructorId?.instrctorname}</h4>
                </div>
                <div className="col-lg-4">
                  <h1>Duration</h1>
                  <h4>{newLessons?.courseId?.duration} week</h4>
                </div>
                <div className="col-lg-4">
                  <h1>Price</h1>
                  <h4>₹{newLessons?.courseId?.coursefee}</h4>
                </div>
              </div>
            </div>
            <div className="container mt-5">
              <h1>Syllabus</h1>
             
              {newLessons.courseId?.courseLessons?.map((lesson: any, index: number) => (
                <Accordion key={index} defaultActiveKey="0" className="mt-5 bg-danger">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Module {index + 1}</Accordion.Header>
                    <Accordion.Body>{lesson.title}</Accordion.Body>
                    <Accordion.Body>
                      <video
                        src={`${baseVideo}/${lesson?.video}`}
                        controls
                        style={{ width: "100%", height: "100px" }}
                      ></video>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              ))}
            </div>
            <div className="container">
              <div className="about-box">
                <h1>Review of Course</h1>
                {showReview.map((review) => (
                  <div key={review?._id}>
                    <div className="container">
                      <h4>{review?.studentId?.studentname}</h4>
                      <h6>{review?.review}</h6>
                    </div>
                  </div>
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
                  cols={50}
                  rows={4}
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
