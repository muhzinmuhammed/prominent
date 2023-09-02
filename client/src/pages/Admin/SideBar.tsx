import React, { useState, useEffect } from "react";
import { Col, Row, Table, InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";
import Sidebar from "../../Components/Admin/SideBAr";
import ReactPaginate from "react-paginate";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SideBar = () => {
  const [studentDetails, setStudentDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0); // Current page number
  const itemsPerPage = 10; // Number of items to display per page

  useEffect(() => {
    // Fetch data from your API using Axios

    axios
      .get("http://localhost:5000/admin/getallstudent")
      .then((response) => {
        setStudentDetails(response.data.studentDetails);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  // Filter student data based on the search query
  const filteredStudents = studentDetails.filter((user) => {
    const fullName = user.studentname.toLowerCase();

    const query = searchQuery.toLowerCase();
    return fullName.includes(query);
  });

  // Calculate the total number of pages
  const pageCount = Math.ceil(filteredStudents.length / itemsPerPage);

  // Slice the data to display only the current page
  const displayedStudents = filteredStudents.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  const blockUser = async (id) => {
    const shouldDelete =  toast.info("Are you want to block user", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000, // Time in milliseconds before the toast automatically closes
      hideProgressBar: true, // Hide the progress bar
      closeButton: false, // Hide the close button
      className: "alert-toast", // You can define a custom CSS class for styling
    });

    if (shouldDelete) {
      try {
        await axios.put(`http://localhost:5000/admin/blockStudents/${id}`);
        // You can optionally add a success message or perform other actions here
        toast.success("User Blocked Successfully");
      } catch (error) {
        // Handle errors and display an error message to the user
        toast.error(error);
      }
    }
  };
  const unblockUser = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to block this user?"
    );

    if (shouldDelete) {
      try {
        await axios.put(`http://localhost:5000/admin/unblockStudents/${id}`);
        // You can optionally add a success message or perform other actions here
        toast.success("user un block success fully");
      } catch (error) {
        // Handle errors and display an error message to the user
        console.error("Error blocking user:", error);
        alert("An error occurred while blocking the user");
      }
    }
  };
  // Handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <Row>
      <ToastContainer />
      <Col xs={12} md={2}>
        <Sidebar />
      </Col>
      <Col className="mt-5 " xs={12} md={8}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedStudents.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.studentname}</td>
                <td>{user.studentemail}</td>
                <td>{user.phone}</td>
                <td>
                  <button
                    onClick={() => {
                      if (user.isBlocked === false) {
                        blockUser(user._id);
                      } else {
                        unblockUser(user._id);
                      }
                    }}
                    className={
                      user.isBlocked === false
                        ? "btn btn-success"
                        : "btn btn-danger"
                    }
                  >
                    {user.isBlocked === false ? "Block" : "Unblock"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination */}
        <ReactPaginate
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
        />
      </Col>
    </Row>
  );
};

export default SideBar;
