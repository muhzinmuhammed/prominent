import React, { useState, useEffect } from "react";
import Nav from "./Header/Nav";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import adminInstance from "../../AxiosEndPoint/adminInstance";
import Swal from "sweetalert2";

const GetAllCourse = ({ Toggle }) => {
  const [courseStatus, setCourseStatus] = useState([]);
  const baseUrl = "http://res.cloudinary.com/dfnwvbiyy/image/upload/v1694269781";
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Change this number based on your desired items per page

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

  const filteredCourses = courses.filter((course) =>
    course.coursename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const indexOfLastCourse = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const toggleCourseStatus = async (course) => {
    try {
      // Display a confirmation dialog using SweetAlert
      const result = await Swal.fire({
        title: `Are you sure you want to ${
          course.isApproved ? "unapprove" : "approve"
        } the course "${course.coursename}"?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        if (!course.isApproved) {
          await adminInstance.put(`/admin/approvedCourse/${course._id}`);
          course.isApproved = true;
          toast.success(`Course "${course.coursename}" approved successfully`);
        } else {
          await adminInstance.put(`/admin/unapprovedCourse/${course._id}`);
          course.isApproved = false;
          toast.success(`Course "${course.coursename}" unapproved successfully`);
        }
        // Update the user's status in local storage
        localStorage.setItem(
          `user_${course._id}_status`,
          course.isBlocked ? "Not Approved" : "Approved"
        );
        setCourses([...courses]); // Trigger a re-render
      }
    } catch (error) {
      // Handle errors and display an error message to the user
      toast.error(error.message);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="px-3">
      <Nav Toggle={Toggle} />
      <ToastContainer />
      <h1>Course Table</h1>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search for a course..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control"
        />
      </div>
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
          {currentCourses.map((course, index) => (
            <tr key={course._id}>
              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
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
      <div className="pagination">
        {currentPage > 1 && (
          <button
            onClick={handlePrevPage}
            className="pagination-button"
          >
            Prev
          </button>
        )}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`pagination-button ${
              currentPage === index + 1 ? "active" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            onClick={handleNextPage}
            className="pagination-button"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default GetAllCourse;
