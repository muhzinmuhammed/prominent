import React, { useState, useEffect } from "react";
import Nav from "./Header/Nav";


import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import adminInstance from "../../AxiosEndPoint/adminInstance";

const OrdersTable = ({ Toggle }) => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page
  const [filteredInstructors, setFilteredInstructors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // Number of items to display per page

  useEffect(() => {
    // Fetch data from your API using Axios
    adminInstance
      .get("/admin/order")
      .then((response) => {
        
       
        setOrders(response.data.order);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    // Update the filtered instructors when the search query changes
    const filtered = orders.filter((order) =>
    order.studentId.studentname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredInstructors(filtered);
  }, [searchQuery, orders]);

  // Calculate the total number of pages
  
  const totalPages = Math.ceil(filteredInstructors.length / itemsPerPage);

  const indexOfLastCategory = currentPage * itemsPerPage;
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
  const OrderTable = filteredInstructors.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

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


  // Get the data to display on the current page
 
  return (
    <div className="px-3">
      <Nav Toggle={Toggle} />
      <ToastContainer />
      <h1>Order Table</h1>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search for an Order..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control"
        />
      </div>
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
          {OrderTable.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order.studentId?.studentname}</td>
              <td>{order.courseId.coursename}</td>
              <td>{order.courseId.coursefee}</td>
              <td>{order.instructorId.instrctorname}</td>
              <td>{order.status}</td>
             
              {/* Add action buttons or elements here if needed */}
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

export default OrdersTable;
