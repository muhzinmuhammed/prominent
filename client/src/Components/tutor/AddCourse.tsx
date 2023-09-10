import React, { useState, useEffect } from "react";
import Nav from "../../Components/tutor/SideNavbar/Nav";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../AxiosEndPoint/axiosEnd"; 
import { useNavigate } from "react-router-dom";
const AddCourse = ({ Toggle }) => {
  const [category, setCategory] = useState('');
  const [instructor, setInstructor] = useState('');
  const [photo, setPhoto] = useState('');
  const [coursename, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [courseduration, setCourseduration] = useState('');
  const [price, setPrice] = useState(0);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [instructorOptions, setInstructorOptions] = useState([]);
  const [cloudinaryURL, setCloudinaryURL] = useState('');
  const navigate=useNavigate()
// Store the Cloudinary URL

  function handleChange(e) {
    setPhoto(e.target.files[0]);
  }

  useEffect(() => {
    // Fetch categories from the server
    axiosInstance.get(`/instructor/getCategory`)
      .then((response) => {
       
        
        setCategoryOptions(response.data.courseDetails);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch instructors from the server
    axiosInstance.get('/instructor/allInstructor')
      .then((response) => {
        setInstructorOptions(response.data.tutor);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handlePhotoUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", photo);
      formData.append("upload_preset", "mtcgx5gz");
      formData.append("cloud_name", "dfnwvbiyy");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dfnwvbiyy/image/upload",
        formData
      );
      
      
      setCloudinaryURL(response.data.public_id);
      
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  const handleSubmit = async (e) => {
    
    
    e.preventDefault();

    // Perform photo upload first
    await handlePhotoUpload();

    // Check if the photo upload was successful
    if (!cloudinaryURL) {
        
        
      toast.error("Error uploading photo");
      return;
    }
    
    

    // Send the course data to your server
    axiosInstance
      .post('/instructor/addCourse', {
       
        
       
        coursename,
        courseduration,
        coursedescrption:  description,
        category,
        instructor,
        photo: cloudinaryURL, // Use the Cloudinary URL
        coursefee:price,
        
      })
      .then((response) => {
        console.log(response.data);
        navigate('/add_course')
        toast.success('Course added successfully');
        
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error adding course');
      });
  };

  return (
   
    <div className="px-3">
        
      <Nav Toggle={Toggle} />
      <ToastContainer />
      <h1>Add Course</h1>
      <form className="form rounded w-50 pt-5" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course Name</label>
          <input type="text" className="form-control" placeholder="Enter course name" value={coursename} onChange={(e)=>setCourseName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Course Duration</label>
          <input type="number" className="form-control" placeholder="Enter duration" value={courseduration} onChange={(e)=>setCourseduration(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Course Price</label>
          <input type="number" className="form-control" placeholder="Enter course price" value={price} onChange={(e)=>setPrice(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Course Description</label>
          <input type="text" className="form-control" placeholder="Enter course description" value={description} onChange={(e)=>setDescription(e.target.value)} />
        </div>
        <div className="form-group">
  <label htmlFor="categorySelect">Course Category</label>
  <select
    className="form-control"
    id="categorySelect"
    value={category}
    onChange={(e) => setCategory(e.target.value)} // Use onChange instead of onClick
  >
     <option value="">Select Category</option>
                {categoryOptions.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
    ))}
  </select>
</div>

<div className="form-group">
  <label htmlFor="instructorSelect">Course Instructor</label>
  <select
    className="form-control"
    id="instructorSelect"
    value={instructor}
    onChange={(e) => setInstructor(e.target.value)} // Use onChange instead of onClick
  >
    <option value="">Select Instructor</option>
    {instructorOptions.map((inst) => (
      <option key={inst._id} value={inst._id}>
        {inst.instrctorname}
      </option>
    ))}
  </select>
</div>

<div className="form-group">
          <label>Photo</label>
          <input
            type="file"
            className="form-control"
            accept="image/*" // Specify the file type
            onChange={handleChange}
          />
          {photo && (
            <img
              src={URL.createObjectURL(photo)}
              alt="Course"
              style={{ height: "100px", width: "100px" }}
            />
          )}
        </div>
        <button type="submit" className="btn btn-info mt-5 ms-5">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
