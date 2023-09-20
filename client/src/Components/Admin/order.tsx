import React, { useState, useEffect } from "react";
import Nav from "./Header/Nav";


import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import adminInstance from "../../AxiosEndPoint/adminInstance";

const OrdersTable = ({ Toggle }) => {
  const [orders, setOrders] = useState([]);
 
  // Number of items to display per page

  useEffect(() => {
    // Fetch data from your API using Axios
    adminInstance
      .get("/admin/order")
      .then((response) => {
        console.log('====================================');
        console.log(response.data,"kk");
        console.log('====================================');
       
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
      <h1>Category Table</h1>
      <table className="table rounded mt-2">
        
        <thead>
          <tr>
            <th>#</th>
            <th>Student Name</th>
            <th>Course Name</th>

            <th>Rate</th>
            <th>Instructor</th>
            <th>Payment Status</th>
           
           
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order.studentname.studentname}</td>
              <td>{order.coursename.coursename}</td>
              <td>{order.coursename.coursefee}</td>
              <td>{order.instructor.instrctorname}</td>
              <td>Success</td>
             
              {/* Add action buttons or elements here if needed */}
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
};

export default OrdersTable;
