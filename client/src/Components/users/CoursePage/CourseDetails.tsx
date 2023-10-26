import React, { useEffect, useState } from "react";
import "./Coursedetails.css";
import { useParams } from "react-router-dom";
import { Badge, Accordion } from "react-bootstrap";
import axiosInstance from "../../../AxiosEndPoint/axiosEnd";
import { toast, ToastContainer } from "react-toastify";

interface CourseDetailsProps {
  course: {
    _id: string;
    photo: string;
    coursename: string;
    courseLevel: string;
    coursedescription: string;
    instructor?: {
      instrctorname: string;
    };
    duration: string;
    coursefee: string;
    courseLessons: Array<{
      title: string;
      video: string;
    }>;
  };
}

interface Review {
  _id: string;
  review: string | null;
  studentId?: {
    studentname: string | null;
  };
}

const CourseDetails: React.FC = () => {
  const baseUrl =
    "http://res.cloudinary.com/dfnwvbiyy/image/upload/v1694269781";
  const baseVideo =
    "https://res.cloudinary.com/dfnwvbiyy/video/upload/v1694365110/";
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<CourseDetailsProps["course"] | null>(
    null
  );
  const studentsname = localStorage.getItem("userData");
  const student = studentsname ? JSON.parse(studentsname) : null;
  const [showReview, setShowReview] = useState<Review[] | null>(null);

  useEffect(() => {
    axiosInstance.get(`/student/getreview/${id}`).then((response) => {
      setShowReview(response.data.review);
    });
  }, [id]);

  useEffect(() => {
    axiosInstance.get(`/student/allLessons/${id}`).then((response) => {
      if (response.data.course) {
        setCourse(response.data.course);
      }
    });
  }, [id]);

  const initPayment = async (data: {
    amount: string;
    currency: string;
    id: string;
  }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await axiosInstance.post<any>(
        "/student/create-payment",
        {
          amount: data.amount,
          coursename: id,
          studentname: student?._id,
        }
      );

      if (response.status === 200) {
        const options = {
          key: "rzp_test_mEetqy2BIAhoF3",
          amount: data.amount,
          currency: data.currency,
          description: "Test Transaction",
          order_id: data.id,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          handler: async (response: any) => {
            try {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
               await axiosInstance.post<any>(
                "/student/verify",
                {
                  response,
                  studentname: student?._id,
                  coursename: id,
                  amount: data.amount,
                }
              );
             
            } catch (error) {
              console.log(error);
            }
          },
          theme: {
            color: "#1eb2a6",
          },
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rzp1 = new (window as any).Razorpay(options);
        rzp1.open();
      } else {
        toast.error("Already Buying This Course");
      }
    } catch (error) {
      toast.error("Already Buying This Course");
    }
  };

  const handleSubmit = async () => {
    if (course) {
      const prices = course?.coursefee;

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await axiosInstance.post<any>("/student/create-payment", {
          amount: prices,
          coursename: id,
          studentname: student?._id,
        });

        if (response.status === 200) {
          initPayment(response.data.data);
        } else {
          toast.error("Already Buying This Course");
        }
      } catch (error) {
        toast.error("Already Buying This Course");
      }
    }
  };

  return (
    <div className="container">
      <ToastContainer />
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
            </div>
            <div className="container course-image mt-5 me-5">
              <img
                src={`${baseUrl}/${course?.photo}`}
                className="img-fluid w-100"
                alt="..."
              />
            </div>

            <div className="container">
              <h1 className="text-center mt-5 text-info">
                {course?.coursename}
              </h1>

              <h4>
                Difficuly:
                <Badge bg="success" className="ms-3 ">
                  {course?.courseLevel}
                </Badge>
              </h4>
            </div>
          </div>

          <div className="container mt-5">
            <div className="row">
              <div className="col-lg-3">
                <h1>Instructor</h1>
                <h6>{course.instructor?.instrctorname}</h6>
              </div>
              <div className="col-lg-3">
                <h1>Duration</h1>
                <h6>{course?.duration} week</h6>
              </div>
              <div className="col-lg-3">
                <h1>Price</h1>
                <h6>₹{course?.coursefee}</h6>
              </div>
              <div className="col-lg-3 ">
                <h1>Buy Now</h1>
                <button
                  className="btn btn-info  buy-button"
                  onClick={() => {
                    const userData = localStorage.getItem("userData");
                    if (userData) {
                      handleSubmit();
                    } else {
                      alert("Please login");
                    }
                  }}
                >
                  ENROLL NOW
                </button>
              </div>
            </div>
          </div>

          <div className="container">
            <h3 className="mt-5 ms-5">About this course</h3>
            <div className="about-box">{course?.coursedescription}</div>
          </div>

          <div className="container">
            <h3 className="mt-5 ms-5">Requirements</h3>
            <div className="about-box">
              <ul>
                <li>No prior programming experience required</li>
                <li>Access to a computer with an internet connection</li>
                <li>Curiosity and eagerness to learn</li>
              </ul>
            </div>
          </div>
          <div className="container mt-5">
            <h1>Syllabus</h1>

            {course?.courseLessons?.map((lesson, index) => (
              <Accordion
                key={index}
                defaultActiveKey="0"
                className="mt-5 bg-danger"
              >
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Module {index + 1}</Accordion.Header>
                  <Accordion.Body> {lesson.title}</Accordion.Body>
                  <Accordion.Body>
                    {index === 0 && lesson.video && (
                      <video
                        src={`${baseVideo}/${lesson.video}`}
                        controls
                        style={{ width: "100%", height: "100px" }}
                      ></video>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}
          </div>

          {showReview && (
            <div className="container">
              <div className="about-box">
                <h1>Review of Course</h1>
                {showReview.map((review) => (
                  <div key={review._id} className="container">
                    <h4>{review.studentId?.studentname}</h4>
                    <h6>{review.review}</h6>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default CourseDetails;
