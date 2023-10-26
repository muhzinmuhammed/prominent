import React, { useState, useEffect } from "react";
import Nav from "./SideNavbar/Nav";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import tutorInstance from "../../AxiosEndPoint/tutorInstance";

const tutor = localStorage.getItem('tutorData');
const tutor_id = tutor ? JSON.parse(tutor) : null;

const EntrolledCourse: React.FC<{ Toggle: () => void }> = ({ Toggle }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // Fetch data from your API using Axios
    tutorInstance
      .get(`/instructor/orderTutor/${tutor_id?._id}`)
      .then((response) => {
        console.log(response.data);
        setOrders(response.data.order);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [tutor_id]);

  return (
    <div className="px-3">
      <Nav Toggle={Toggle} />
      <ToastContainer />
      <h1>Enrolled Course</h1>
      <table className="table rounded mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Course Id</th>
            <th>Student Name</th>
            <th>Course Name</th>
            <th>Rate</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, index) => (
            <tr key={order?._id}>
              <td>{index + 1}</td>
              <td>{order?._id}</td>
              <td>{order?.studentId?.studentname}</td>
              <td>{order?.courseId?.coursename}</td>
              <td>{order?.amount}</td>
              <td>Success</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EntrolledCourse;
