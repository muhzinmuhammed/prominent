import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./cousepage.css";
import axiosInstance from "../../../AxiosEndPoint/axiosEnd";
import { toast } from "react-toastify";

const CoursePage = () => {
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

  return (
    <>
      <div className="container course-header">
        <h1 className="">A broad selection of courses</h1>
        <h5>
          Choose from over 9 online video courses with new additions published
          every month
        </h5>
      </div>

      <section className="course-card">
        <div className="container">
          <div className="row ms-5 mt-5">
            {course.map((course) => (
              <div key={course._id} className="col-lg-4 mt-5">
                <div className="card-border card" style={{ width: "18rem" }}>
                  <Link
                    to={`/course_details/${course}`}
                    className="text-decoration-none"
                  >
                    <img
                      className="card-img-top"
                      src={`${baseUrl}/${course.photo}`}
                      style={{ height: "100px" }}
                      alt="Card image cap"
                    />
                    <div className="card-body">
                      <h5 className="card-title text-center">
                        {course.coursename}
                      </h5>
                      <p className="card-text">{course.coursedescription}</p>
                      <small>{course.coursefee}</small>
                      <small className="float-end">*********</small>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CoursePage;
