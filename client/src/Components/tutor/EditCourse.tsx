import React, { useEffect, useState } from 'react';
import Nav from "../tutor/SideNavbar/Nav";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import tutoraxiosinstance from "../../AxiosEndPoint/tutorInstance";
import { useParams } from 'react-router-dom';

const EditCourse = ({ Toggle }) => {
  const [editCourse, setEditCourse] = useState({});
  const { id } = useParams();
  const [coursename, setCourseName] = useState('');
  const [courseduration, setCourseduration] = useState('');
  const [coursefee, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
 const navigate=useNavigate()
  useEffect(() => {
    tutoraxiosinstance.get(`/instructor/courses/${id}`)
      .then((response) => {
        const courseData = response.data.editCourse;
        setEditCourse(courseData);
        setCourseName(courseData.coursename);
        setCourseduration(courseData.courseduration);
        setPrice(courseData.coursefee);
        setDescription(courseData.coursedescrption);
        setCategory(courseData.category);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

 

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can submit the form data, such as coursename, courseduration, etc., to your backend API for editing the course.
    // Make sure to send the data as needed by your API.
    const formData = new FormData();
    formData.append('coursename', coursename);
    formData.append('courseduration', courseduration);
    formData.append('coursefee', coursefee);
    formData.append('coursedescrption', description);
  
    

    // Send the formData to your API for course editing
    tutoraxiosinstance.put(`/instructor/edit_courses/${id}`, {
      coursename,
      courseduration,
      coursefee,
      description

    })
      .then((response) => {
        navigate('/course_view_tutor')
        // Handle the response, e.g., show a success toast
        toast.success("Course edited successfully");
      })
      .catch((error) => {
        // Handle errors, e.g., show an error toast
        toast.error("Error editing course");
        console.log(error);
      });
  };

  return (
    <div>
      <Nav Toggle={Toggle} />
      <ToastContainer />
      <h1>Edit Courses</h1>
      <form className="form rounded w-50 pt-5" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course Name</label>
          <input type="text" className="form-control" placeholder="Enter course name" value={coursename} onChange={(e) => setCourseName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Course Duration</label>
          <input type="number" className="form-control" placeholder="Enter duration" value={courseduration} onChange={(e) => setCourseduration(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Course Price</label>
          <input type="number" className="form-control" placeholder="Enter course price" value={coursefee} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Course Description</label>
          <input type="text" className="form-control" placeholder="Enter course description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        
       
        <button type="submit" className="btn btn-info mt-5 ms-5">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditCourse;
