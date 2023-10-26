import React, { useState, useEffect } from "react";
import Nav from "../tutor/SideNavbar/Nav";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import tutoraxiosinstance from "../../AxiosEndPoint/tutorInstance";
import { Link } from "react-router-dom";

const CourseTable: React.FC<{ Toggle: () => void }> = ({ Toggle }) => {
  const baseUrl =
    "http://res.cloudinary.com/dfnwvbiyy/image/upload/v1694269781";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [courses, setCourses] = useState<any[]>([]);
  const tutor = localStorage.getItem("tutorData");
  const tutor_Details = tutor ? JSON.parse(tutor) : null;
  const tutor_id = tutor_Details ? tutor_Details._id : "";

  useEffect(() => {
    // Fetch data from your API using Axios
    tutoraxiosinstance
      .get(`/instructor/allcourses/${tutor_id}`)
      .then((response) => {
        console.log(response.data);
        setCourses(response.data.courses);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [tutor_id]);

  return (
    <div className="px-3">
      <Nav Toggle={Toggle} />
      <ToastContainer />
      <h1>Course Table</h1>
      <table className="table rounded mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Course</th>
            <th>Description</th>
            <th>Photo</th>
            <th>Fees</th>
            <th>Edit</th>
            <th>Lessons</th>
          </tr>
        </thead>
        <tbody>
          {courses?.map((course, index) => (
            <tr key={course?._id}>
              <td>{index + 1}</td>
              <td>{course?.coursename}</td>
              <td>{course?.coursedescription}</td>
              <td>
                <img style={{ width: "100px" }} src={`${baseUrl}/${course?.photo}`} alt={course?.coursename} />
              </td>
              <td>{course.coursefee}</td>
              <td>
                <Link to={`/edit_course/${course?._id}`}>
                  <i className="bi bi-pencil"></i>
                </Link>
              </td>
              <td>
                <Link to={`/course_lessons/${course?._id}`}>
                  <i className="bi bi-book"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
