import React, { useState, useEffect } from "react";
import Nav from "../../Components/tutor/SideNavbar/Nav";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../AxiosEndPoint/axiosEnd";
const AddLessonInTutor = ({ Toggle }) => {
  const [category, setCategory] = useState('');
  const [instructor, setInstructor] = useState('');
  const [video, setVideo] = useState(null); // Initialize with null
  const [coursename, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [courseduration, setCourseduration] = useState(0); // Initialize with 0

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [title, setTitle] = useState('');
  const [instructorOptions, setInstructorOptions] = useState([]);
  const [courseorOptions, setCourseorOptions] = useState([]);
  const [cloudinaryURL, setCloudinaryURL] = useState('');

  function handleChange(e) {
    setVideo(e.target.files[0]);
  }

  useEffect(() => {
    // Fetch categories from the server
    axios.get('http://localhost:5000/instructor/getCategory')
      .then((response) => {
        setCategoryOptions(response.data.courseDetails);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch courses from the server
    axiosInstance.get('/instructor/allcourses')
      .then((response) => {
        setCourseorOptions(response.data.courses);
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
      formData.append("file", video);
      formData.append("upload_preset", "videoupload");
      formData.append("cloud_name", "dfnwvbiyy");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dfnwvbiyy/video/upload",
        formData
      );
      console.log(response.data,"kk");
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
    axiosInstance
      .post('/instructor/addLesson', {
        title,
        coursename,
        duration:courseduration,
        coursedescrption: description,
        category,
        instructor,
        video: cloudinaryURL,
      })
      .then((response) => {
        console.log(response.data);
        toast.success('Lesson added successfully');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error adding lesson');
      });
  };
  console.log(courseorOptions,"lll");
  

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
          <label htmlFor="categorySelect">Course Category</label>
          <select
            className="form-control"
            id="categorySelect"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            onChange={(e) => setInstructor(e.target.value)}
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
