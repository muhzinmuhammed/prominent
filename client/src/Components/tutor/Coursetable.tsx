import React, { useState, useEffect } from "react";
import Nav from "../tutor/SideNavbar/Nav";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../AxiosEndPoint/axiosEnd";

const CourseTable = ({ Toggle }) => {
    
  
  const baseUrl = "http://res.cloudinary.com/dfnwvbiyy/image/upload/v1694269781";
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch data from your API using Axios
    axiosInstance
      .get("/instructor/allcourses")
      .then((response) => {
        console.log(response.data);
        setCourses(response.data.courses);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

 

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
           
            <th>Fees</th>
           
            
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={course._id}>
              <td>{index + 1}</td>
              <td>{course.coursename}</td>
              <td>{course.coursedescrption}</td>
             
              <td>{course.coursefee}</td>
              
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
