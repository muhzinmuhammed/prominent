import React, { useState, useEffect } from "react";
import Nav from "./Header/Nav";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import adminInstance from "../../AxiosEndPoint/adminInstance";

interface HomeProps {
  Toggle: () => void;
}

const Home: React.FC<HomeProps> = ({ Toggle }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [studentDetails, setStudentDetails] = useState<any[]>([]);
  const [searchQuery] = useState<string>("");
  const [currentPage] = useState<number>(0); // Current page number
  const itemsPerPage: number = 10; // Number of items to display per page

  useEffect(() => {
    // Fetch data from your API using Axios
    adminInstance
      .get("/admin/getallstudent")
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

  // Calculate the total number of page
 

  // Slice the data to display only the current page
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const displayedStudents: any[] = filteredStudents.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toggleUserStatus = async (user: any) => {
    try {
      if (user.isBlocked === false) {
        await adminInstance.put(`/admin/blockStudents/${user._id}`);
        user.isBlocked = true;
        toast.success("User Blocked Successfully");
      } else {
        await adminInstance.put(`/admin/unblockStudents/${user._id}`);
        user.isBlocked = false;
        toast.success("User Unblocked Successfully");
      }
      // Update the user's status in local storage
      localStorage.setItem(
        `user_${user._id}_status`,
        user.isBlocked ? "blocked" : "unblocked"
      );
      setStudentDetails([...studentDetails]); // Trigger a re-render
    } catch (error) {
      // Handle errors and display an error message to the user
      toast.error("error");
    }
  };

  return (
    <div className="px-3">
      <Nav Toggle={Toggle} />
      <ToastContainer />
      <table className="table rounded mt-2">
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
                  onClick={() => toggleUserStatus(user)}
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
      </table>
    </div>
  );
};

export default Home;
