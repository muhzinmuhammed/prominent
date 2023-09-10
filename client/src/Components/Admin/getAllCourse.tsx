import React, { useState, useEffect } from "react";
import Nav from "./Header/Nav";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../AxiosEndPoint/axiosEnd";

const GetAllCourse = ({ Toggle }) => {
  const [courseStatus,setCourseStatus]=useState([])
  const baseUrl =
    "http://res.cloudinary.com/dfnwvbiyy/image/upload/v1694269781";
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    // Fetch data from your API using Axios
    axiosInstance
      .get("/admin/getAllCourses")
      .then((response) => {
        console.log(response.data);
        setCourses(response.data.courses);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);
  const toggleCourseStatus = async (course) => {
    try {
      if (!course.isApproved) {
        await axiosInstance.put(`/admin/approvedCourse/${course._id}`);
        course.isApproved = true;
        toast.success("Course approved successfully");
      } else {
        await axiosInstance.put(`/admin/unapprovedCourse/${course._id}`);
        course.isApproved = false;
        toast.success("Course unapproved successfully");
      }
      // Update the user's status in local storage
      localStorage.setItem(
        `user_${course._id}_status`,
        course.isBlocked ? "Not Approved" : "Approved"
      );
      setCourses([...courses]); // Trigger a re-render
    } catch (error) {
      // Handle errors and display an error message to the user
      toast.error(error.message);
    }
  };
  
  return (
    <div className="px-3">
      <Nav Toggle={Toggle} />
      <ToastContainer />
      <h1>Category Table</h1>
      <table className="table rounded mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Course</th>
            <th>Description</th>
            <th>Instructor</th>
            <th>Fees</th>
            <th>Image</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={course._id}>
              <td>{index + 1}</td>
              <td>{course.coursename}</td>
              <td>{course.coursedescrption}</td>
              <td>{course.instructor.instrctorname}</td>
              <td>{course.coursefee}</td>
              <td>
                <img
                  src={`${baseUrl}/${course.photo}`}
                  alt="ll"
                  style={{ width: "40px" }}
                />
              </td>
              <td>
              <button
                onClick={() => toggleCourseStatus(course)}
                className={
                  course.isApproved === false
                    ? "btn btn-danger"
                    : "btn btn-success"
                }
              >
                {course.isApproved === false ? "Not Approved " : "Approved"}
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllCourse;
