import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Admin/SideBar';
import { Col, Table, Row } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const InstructorInAdmin = () => {
  const [tutorDetails, setTutorDetails] = useState([]);

  useEffect(() => {
    // Fetch data from your API using Axios
    axios
      .get('http://localhost:5000/admin/getallinstrcutor') // Correct the API endpoint
      .then((response) => {
        console.log(response.data);
        setTutorDetails(response.data.instructorDetails); // Assuming the API returns an object with an array called instructorDetails
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  return (
    <div>
      <Row>
        <ToastContainer/>
        <Col xs={12} lg={2}>
          <Sidebar />
        </Col>
        <Col xs={12} lg={10}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {tutorDetails.map((tutor, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{tutor.instrctorname}</td>
                  <td>{tutor.instrctoremail}</td>
                  <td>{tutor.phone}</td>
                 
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default InstructorInAdmin;
