import React, { useState, useEffect } from "react";
import Nav from "./Header/Nav";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import adminInstance from "../../AxiosEndPoint/adminInstance";
import Swal from 'sweetalert2';

const GetAllCourse = ({ Toggle }) => {
  const [courseStatus, setCourseStatus] = useState([]);
  const baseUrl = "http://res.cloudinary.com/dfnwvbiyy/image/upload/v1694269781";
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch data from your API using Axios
    adminInstance
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
      // Display a confirmation dialog using SweetAlert
      const result = await Swal.fire({
        title: `Are you sure you want to ${course.isApproved ? 'unapprove' : 'approve'} the course "${course.coursename}"?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      });
  
      if (result.isConfirmed) {
        if (!course.isApproved) {
          await tutoraxiosInstance.put(`/admin/approvedCourse/${course._id}`);
          course.isApproved = true;
          toast.success(`Course "${course.coursename}" approved successfully`);
        } else {
          await tutoraxiosInstance.put(`/admin/unapprovedCourse/${course._id}`);
          course.isApproved = false;
          toast.success(`Course "${course.coursename}" unapproved successfully`);
        }
        // Update the user's status in local storage
        localStorage.setItem(`user_${course._id}_status`, course.isBlocked ? 'Not Approved' : 'Approved');
        setCourses([...courses]); // Trigger a re-render
      }
    } catch (error) {
      // Handle errors and display an error message to the user
      toast.error(error.message);
    }
  };

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
            <th>Instructor</th>
            <th>Fees</th>
            <th>Image</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={course._id}>
              <td>{index + 1}</td>
              <td>{course.coursename}</td>
              <td>{course.coursedescrption}</td>
              <td>{course.instructor?.instrctorname}</td>
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
                  {course.isApproved === false ? "Not Approved" : "Approved"}
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
