import React, { useState, useEffect } from "react";
import Nav from "../../Components/tutor/SideNavbar/Nav";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import tutoraxiosinstance from "../../AxiosEndPoint/tutorInstance";
import { useNavigate } from "react-router-dom";
const AddLessonInTutor = ({ Toggle }) => {
  const [category, setCategory] = useState('');
 const navigate=useNavigate()
  
  const [video, setVideo] = useState(null); // Initialize with null
  const [coursename, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [courseduration, setCourseduration] = useState(0); // Initialize with 0

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [title, setTitle] = useState('');
  
  const [courseorOptions, setCourseorOptions] = useState([]);
  const [cloudinaryURL, setCloudinaryURL] = useState('');
  const storedUserDataString = localStorage.getItem("tutorData");
  
  
 
  
  const storedUserData = storedUserDataString ? JSON.parse(storedUserDataString) : null;
 
  
  function handleChange(e) {
    setVideo(e.target.files[0]);
  }

  useEffect(() => {
    // Fetch categories from the server
    tutoraxiosinstance.get('/instructor/getCategory')
      .then((response) => {
        setCategoryOptions(response.data.courseDetails);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch courses from the server
    tutoraxiosinstance.get(`/instructor/allcourses/${storedUserData._id}`)
      .then((response) => {
        console.log(response.data);
        
        setCourseorOptions(response.data.courses);
      })
      .catch((error) => {
        console.error(error);
      });

  
      
  }, []);

  const handlePhotoUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", video);
      formData.append("upload_preset", "videoupload");
      formData.append("cloud_name", "dfnwvbiyy");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dfnwvbiyy/video/upload",
        formData
      );
   
      setCloudinaryURL(response.data.public_id);
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("Error uploading video");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform video upload first
    await handlePhotoUpload();

    // Check if the video upload was successful
    if (!cloudinaryURL) {
      toast.error("Error uploading video");
      return;
    }

    // Send the lesson data to your server
    tutoraxiosinstance
      .post('/instructor/addLesson', {
        title,
        coursename,
        duration:courseduration,
        description: description,
      
    
        video: cloudinaryURL,
      })
      .then((response) => {
        console.log(response.data);
        toast.success('Lesson added successfully');
        navigate('/course_view_tutor')
        
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error adding lesson');
      });
  };
 
  

  return (
    <div className="px-3">
      <Nav Toggle={Toggle} />
      <ToastContainer />
      <h1>Add Lesson</h1>
      <form className="form rounded w-50 pt-5" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="courseSelect">Course Name</label>
          <select
            className="form-control"
            id="courseSelect"
            value={coursename}
            onChange={(e) => setCourseName(e.target.value)}
          >
            <option value="">Select Course</option>
            {courseorOptions.map((course) => (
              <option key={course._id} value={course._id}>
                {course.coursename}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Course Duration</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter duration"
            value={courseduration}
            onChange={(e) => setCourseduration(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Course Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter course description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
       
     
        <div className="form-group">
          <label>Video</label>
          <input
            type="file"
            className="form-control"
            accept="video/*"
            onChange={handleChange}
          />
          {video && (
            <video
              controls
              src={URL.createObjectURL(video)}
              style={{ width: "100%" }}
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

export default AddLessonInTutor;
