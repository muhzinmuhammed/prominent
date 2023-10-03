import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./cousepage.css";
import axiosInstance from "../../../AxiosEndPoint/axiosEnd";
import { toast } from "react-toastify";


const CoursePage = () => {
  const baseUrl = "http://res.cloudinary.com/dfnwvbiyy/image/upload/v1694269781";
 

  const [course, setCourse] = useState([]);
  const [entrolled, setEntrolled] = useState([]);
  const user = localStorage.getItem("userData");
  const user_id = JSON.parse(user);

  useEffect(() => {
    if (user_id) {
      axiosInstance
        .get(`/student/entrolled/${user_id._id}`)
        .then((response) => {
          console.log(response.data,"kk");
          
          
          
          // Filter out expired courses
          const currentDate = new Date();
          const filteredEntrolledCourses = response.data.entrolled.filter(
            (entroll) => {
              // Calculate the course end date based on duration and creation date
              const courseDurationInDays = 365; // 1 year (adjust as needed)
              const courseCreationDate = new Date(entroll.createdAt);
              const courseEndDate = new Date(
                courseCreationDate.getTime() +
                courseDurationInDays * 24 * 60 * 60 * 1000
              );
              
             
              
              
              
              // Check if the course end date is in the future
              return courseEndDate > currentDate;
            }
          );


          setEntrolled(filteredEntrolledCourses);
        });
    }
  }, []);

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
                    to={`/course_details/${course._id}`}
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
                      <small className="float-end"></small>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        {user_id && (
  <div className="container">
    <div className="row ms-5 mt-5">
      <h1>Enrolled Courses</h1>
      {entrolled
        .filter((entroll) => entroll.status !== 'Refund')
        .map((entroll) => (
          <div key={entroll._id} className="col-lg-4 mt-5">
            <div className="card-border card" style={{ width: "18rem" }}>
              <Link
                className="text-decoration-none"
                to={`/entroll_course/${entroll._id}`}
              >
                <img
                  className="card-img-top"
                  src={`${baseUrl}/${entroll.courseId.photo}`}
                  style={{ height: "100px" }}
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title text-center">
                    {entroll.courseId.courseId}
                  </h5>
                  <p className="card-text">
                    {entroll.courseId.coursedescription}
                  </p>
                  <small>{entroll.courseId.coursefee}</small>
                  <small className="float-end">*********</small>
                </div>
              </Link>
            </div>
          </div>
        ))}
    </div>
  </div>
)}


      </section>
    </>
  );
};

export default CoursePage;
