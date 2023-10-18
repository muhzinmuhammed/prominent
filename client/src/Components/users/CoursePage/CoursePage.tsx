import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./cousepage.css";
import axiosInstance from "../../../AxiosEndPoint/axiosEnd";
import { toast } from "react-toastify";

interface Course {
  _id: string;
  photo: string;
  coursename: string;
  coursedescription: string;
  instructor?: {
    instrctorname: string;
  };
  coursefee: string;
}

interface Entroll {
  _id: string;
  courseId: {
    corsename: string;
    courseId: string;
    coursedescription: string;
    photo: string;
    coursefee: string;
  };
  status: string;
}

const CoursePage: React.FC = () => {
  const baseUrl = "http://res.cloudinary.com/dfnwvbiyy/image/upload/v1694269781";

  const [course, setCourse] = useState<Course[]>([]);
  const [entrolled, setEntrolled] = useState<Entroll[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]); // State for filtered courses
  const user = localStorage.getItem("userData");
  const user_id = user ? JSON.parse(user) : null;

  useEffect(() => {
    if (user_id) {
      axiosInstance
        .get(`/student/entrolled/${user_id._id}`)
        .then((response) => {
          console.log(response.data, "loll");

          // Filter out expired courses
          const currentDate = new Date();
          const filteredEntrolledCourses = response.data.entrolled.filter(
            (entroll: Entroll) => {
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
  }, [user_id]);

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

  // Function to filter courses based on search query
  const filterCourses = () => {
    if (searchQuery.trim() === "") {
      // If the search query is empty, reset the filtered courses
      setFilteredCourses([]);
    } else {
      // Otherwise, filter the courses that match the search query
      const filtered = course.filter((course) =>
        course.coursename.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  };

  useEffect(() => {
    filterCourses(); // Call the filterCourses function whenever the searchQuery changes
  }, [searchQuery]);

  return (
    <>
      <div className="container course-header">
        <h1 className="">A broad selection of courses</h1>
        <h5>
          Choose from over 9 online video courses with new additions published
          every month
        </h5>

        {/* Add an input field for search */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for courses"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <section className="course-card">
        <div className="container">
          <div className="row ms-5 mt-5">
            {searchQuery === "" // Check if search query is empty
              ? course.map((course) => (
                  // Display all courses if search query is empty
                  <div key={course._id} className="col-lg-4 mt-5">
                    <div
                      className="card-border card"
                      style={{ width: "18rem", height: "400px" }}
                    >
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
                          <p className="text-dark mt-3">
                            <b>{course.coursedescription}</b>
                          </p>
                          <p className="card-text text-center">
                            {course.instructor?.instrctorname}
                          </p>
                          <h4 className="text-center">{course.coursefee}</h4>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))
              : filteredCourses.map((course) => (
                  // Display filtered courses if search query is not empty
                  <div key={course._id} className="col-lg-4 mt-5">
                    <div
                      className="card-border card"
                      style={{ width: "18rem" }}
                    >
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
                          <p className="card-text text-center">
                            {course.instructor?.instrctorname}
                          </p>
                          <h4 className="text-center">{course.coursefee}</h4>
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
                .filter((entroll) => entroll.status !== "Refund")
                .map((entroll) => (
                  <div key={entroll._id} className="col-lg-4 mt-5">
                    <div
                      className="card-border card"
                      style={{ width: "18rem" }}
                    >
                      <Link
                        className="text-decoration-none"
                        to={`/entroll_course/${entroll._id}`}
                      >
                        {entroll.courseId.photo && (
                          <img
                            className="card-img-top"
                            src={`${baseUrl}/${entroll.courseId.photo}`}
                            style={{ height: "100px" }}
                            alt="Card image cap"
                          />
                        )}
                        <div className="card-body">
                          <h5 className="card-title text-center">
                            {entroll.courseId.courseId}
                          </h5>
                          <p className="card-text">
                            {entroll.courseId.coursedescription}
                          </p>
                          <h3>{entroll.courseId.coursefee}</h3>
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
