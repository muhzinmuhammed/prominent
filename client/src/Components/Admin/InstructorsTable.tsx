import React, { useState, useEffect } from "react";
import Nav from "./Header/Nav";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import adminInstance from "../../AxiosEndPoint/adminInstance";

interface InstructorTableProps {
  Toggle: () => void;
}

const InstructorTable: React.FC<InstructorTableProps> = ({ Toggle }) => {
  const [studentDetails, setStudentDetails] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 10; // Number of items to display per page
  const [filteredInstructors, setFilteredInstructors] = useState<any[]>([]);

  useEffect(() => {
    // Fetch data from your API using Axios
    adminInstance
      .get("/admin/getallinstrcutor")
      .then((response) => {
        console.log(response.data);
        const instructorDetails = response.data.instructorDetails;
        setStudentDetails(instructorDetails);
        setFilteredInstructors(instructorDetails); // Initialize filtered data with all instructors
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    // Update the filtered instructors when the search query changes
    const filtered = studentDetails.filter((instructor) =>
      instructor.instrctorname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredInstructors(filtered);
  }, [searchQuery, studentDetails]);

  const totalPages = Math.ceil(filteredInstructors.length / itemsPerPage);

  const indexOfLastCategory = currentPage * itemsPerPage;
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
  const instructoTable = filteredInstructors.slice(
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

  return (
    <div className="px-3">
      <Nav Toggle={Toggle} />
      <ToastContainer />
      <h1>Instructor Table</h1>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search for an Instructor..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control"
        />
      </div>
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
          {instructoTable.map((user, index) => (
            <tr key={user._id}>
              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td>{user.instrctorname}</td>
              <td>{user.instrctoremail}</td>
              <td>{user.phone}</td>
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

export default InstructorTable;
