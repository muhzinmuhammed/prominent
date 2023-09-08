import React, { useState, useEffect } from "react";
import Nav from "./Header/Nav";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryTable = ({ Toggle }) => {
  const [category, setCategory] = useState([]);
 
  // Number of items to display per page

  useEffect(() => {
    // Fetch data from your API using Axios
    axios
      .get("http://localhost:5000/admin/getallcategory")
      .then((response) => {
        console.log(response.data);
        setCategory(response.data.categoryDetails);
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
            <th>Category</th>
            <th>Description</th>
           
           
          </tr>
        </thead>
        <tbody>
          {category.map((category, index) => (
            <tr key={category._id}>
              <td>{index + 1}</td>
              <td>{category.title}</td>
              <td>{category.description}</td>
             
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

export default CategoryTable;