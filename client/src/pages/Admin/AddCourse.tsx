/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState,useEffect } from 'react';
import Sidebar from '../../Components/Admin/SideBar';
import { Col, Row, Form, Button,InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const AdminAddCourse = () => {
  const [coursename, setcoursename] = useState('');
  const [courseduration, setcourseduration] = useState('');
  const [coursedescrption, setcoursedescription] = useState(''); // Corrected the state name
  const [category, setcategory] = useState('');
  const [instructor, setinstructor] = useState('');
  
  // Define state variables for dropdown options
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [instructorOptions, setInstructorOptions] = useState([]);

  useEffect(() => {
    // Fetch categories from the server
    axios.get('http://localhost:5000/admin/getallcategory')
      .then((response) => {
        setCategoryOptions(response.data.courseDetails);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch instructors from the server
    axios.get('http://localhost:5000/admin/getallinstrcutor')
      .then((response) => {
        setInstructorOptions(response.data.instructorDetails);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      setphoto(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // You can make the API call here using Axios
    // Make sure to adjust the API endpoint and payload according to your needs
    axios
      .post('http://localhost:5000/admin/admin_add_course', {
        coursename,
        courseduration,
        coursedescrption,
        category,
        instructor,
       
      })
      .then((response) => {
        console.log(response.data);
        toast.success('Course added successfully'); // You can use toast for notifications
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error adding course'); // You can use toast for error notifications
      });
  };

  return (
    <div>
      <Row>
        <Col xs={12} md={2}>
          <Sidebar />
        </Col>

        <Col xs={12} md={9}>
          <h1>Add Course</h1>
          <Form className='mt-5' encType='multipart/form-data' onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course name"
                value={coursename}
                onChange={(e) => setcoursename(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Course Duration</Form.Label>
              <Form.Control
                type="number"
                placeholder="Course Duration"
                value={courseduration}
                onChange={(e) => setcourseduration(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Course Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course description"
                value={coursedescrption}
                onChange={(e) => setcoursedescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Course Category</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={(e) => setcategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categoryOptions.map((category:any) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </Form.Control>
     </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Instructor Name</Form.Label>
              <Form.Control
                as="select"
                value={instructor}
                onChange={(e) => setinstructor(e.target.value)}
              >
                <option value="">Select Instructor</option>
                {instructorOptions.map((instructor:any) => (
                  <option key={instructor._id} value={instructor._id}>
                    {instructor.instrctorname}
                  </option>
                ))}
              </Form.Control>
       </Form.Group>

            

            <Button className='mt-3 align-items-center d-block' variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default AdminAddCourse;
