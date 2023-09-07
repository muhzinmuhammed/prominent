import React, { useState, useEffect } from "react";
import Nav from "./Header/Nav";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InstructorTable = ({ Toggle }) => {
  const [studentDetails, setStudentDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0); // Current page number
  const itemsPerPage = 10; // Number of items to display per page

  useEffect(() => {
    // Fetch data from your API using Axios
    axios
      .get("http://localhost:5000/admin/getallinstrcutor")
      .then((response) => {
        console.log(response.data);
        setStudentDetails(response.data.instructorDetails);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  // Calculate the total number of pages
  const pageCount = Math.ceil(studentDetails.length / itemsPerPage);

  // Handle page changes
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Get the data to display on the current page
 
  return (
    <div className="px-3">
      <Nav Toggle={Toggle} />
      <ToastContainer />
      <h1>Instructor Table</h1>
      <table className="table rounded mt-2">
        
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
           
          </tr>
        </thead>
        <tbody>
          {studentDetails.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.instrctorname}</td>
              <td>{user.instrctoremail}</td>
              <td>{user.phone}</td>
              {/* Add action buttons or elements here if needed */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      /> */}
    </div>
  );
};

export default InstructorTable;
