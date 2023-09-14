import React, { useState, useEffect } from "react";
import Nav from "../tutor/SideNavbar/Nav";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import tutoraxiosinstance from "../../AxiosEndPoint/tutorInstance";
import { Link } from "react-router-dom";

const CourseTable = ({ Toggle }) => {
    
  
  const baseUrl = "http://res.cloudinary.com/dfnwvbiyy/image/upload/v1694269781";
  const [courses, setCourses] = useState([]);
  const tutor=localStorage.getItem("tutorData")
  const tutor_Details=JSON.parse(tutor)
const tutor_id=tutor_Details._id
  
  

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
            <th>Photo</th>

           
            <th>Fees</th>
            <th>Edit</th>
           
            
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={course._id}>
              <td>{index + 1}</td>
              <td>{course.coursename}</td>
              <td>{course.coursedescrption}</td>
              <td><img style={{width:"100px"}} src={`${baseUrl}/${course.photo}`}/></td>
             
              <td>{course.coursefee}</td>
              <td>
             <Link to={`/edit_course/${course._id}`}>  <i  className="bi bi-pencil"></i></Link> 
              </td>
              
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
