import React, { useState, useEffect } from 'react';
import { Col, Row, Table, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import Sidebar from '../../Components/Admin/SideBAr';

const SideBar = () => {
  const [studentDetails, setStudentDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch data from your API using Axios
    axios.get('http://localhost:5000/admin/getallstudent')
      .then((response) => {
        console.log(response.data);
        setStudentDetails(response.data.studentDetails);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Filter student data based on the search query
  const filteredStudents = studentDetails.filter((user) => {
    const fullName = user.studentname.toLowerCase();
    
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) ;
  });

  return (
    <Row>
      <Col xs={12} md={2}>
        <Sidebar />
      </Col>
      <Col className='mt-5 ' xs={12} md={8}>
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.studentname}</td>
                <td>{user.studentemail}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default SideBar;
