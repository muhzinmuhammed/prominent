import React, { useState, useEffect } from "react";
import Nav from "./SideNavbar/Nav";


import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import tutorInstance from "../../AxiosEndPoint/tutorInstance";
const tutor=localStorage.getItem('tutorData')
const tutor_id=JSON.parse(tutor)



const EntrolledCourse = ({ Toggle }) => {
  const [orders, setOrders] = useState([]);
 
  // Number of items to display per page

  useEffect(() => {
    // Fetch data from your API using Axios
    tutorInstance
      .get(`/instructor/orderTutor/${tutor_id._id}`)
      .then((response) => {
       console.log(response.data);
       
       
        setOrders(response.data.order);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  // Calculate the total number of pages
  



  // Get the data to display on the current page
 
  return (
    <div className="px-3">
      <Nav Toggle={Toggle} />
      <ToastContainer />
      <h1>Entrolled Course </h1>
      <table className="table rounded mt-2">
        
        <thead>
          <tr>
            <th>#</th>
            <th>Student Name</th>
            <th>Course Name</th>

            <th>Rate</th>
           
            <th>Payment Status</th>
           
           
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order.studentId?.studentname}</td>
              <td>{order.courseId?.coursename}</td>
              <td>{order.amount}</td>
            
              <td>Success</td>
             
              {/* Add action buttons or elements here if needed */}
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
};

export default EntrolledCourse;
