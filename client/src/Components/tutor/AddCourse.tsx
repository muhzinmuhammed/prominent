import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Nav from "../../Components/tutor/SideNavbar/Nav";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import tutoraxiosInstance from "../../AxiosEndPoint/tutorInstance";
import { useNavigate } from "react-router-dom";


interface AddCourseProps {
  Toggle: () => void;
}

const AddCourse: React.FC<AddCourseProps> = ({ Toggle }) => {
  const storedUserDataString = localStorage.getItem("tutorData");

  const storedUserData = storedUserDataString
    ? JSON.parse(storedUserDataString)
    : null;

  const [category, setCategory] = useState<string>("");

  const [photo, setPhoto] = useState<File | null>(null);
  const [coursename, setCourseName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [courseduration, setCourseduration] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
  const [level, setLevel] = useState<string>("");

  const [cloudinaryURL, setCloudinaryURL] = useState<string>("");
  const navigate = useNavigate();
  // Store the Cloudinary URL

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  }

  useEffect(() => {
    // Fetch categories from the server
    tutoraxiosInstance
      .get(`/instructor/getCategory`)
      .then((response) => {
        setCategoryOptions(response.data.courseDetails);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handlePhotoUpload = async () => {
    try {
      const formData = new FormData();
      if (photo) {
        formData.append("file", photo);
        formData.append("upload_preset", "mtcgx5gz");
        formData.append("cloud_name", "dfnwvbiyy");
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dfnwvbiyy/image/upload",
          formData
        );

        setCloudinaryURL(response.data.public_id);
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Perform photo upload first
    await handlePhotoUpload();

    // Check if the photo upload was successful
    if (!cloudinaryURL) {
      toast.error("Error uploading photo");
      return;
    }

    // Send the course data to your server
    tutoraxiosInstance
      .post("/instructor/addCourse", {
        coursename,
        courseduration: courseduration,
        coursedescription: description,
        category,
        instructor: storedUserData._id,
        photo: cloudinaryURL, // Use the Cloudinary URL
        coursefee: price,
        courseLevel: level,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/course_view_tutor");
        toast.success("Course added successfully");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error adding course");
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
          <input
            type="text"
            className="form-control"
            placeholder="Enter course name"
            value={coursename}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Course Duration</label>
          <input
            type="date"
            className="form-control"
            placeholder="Enter duration"
            value={courseduration}
            onChange={(e) => setCourseduration(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Course Price</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter course price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label>Course Description</label>
          <textarea
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
            {categoryOptions?.map((category) => (
              <option key={category?._id} value={category?._id}>
                {category?.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="levelSelect">Course Level</label>
          <select
            className="form-control"
            id="levelSelect"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            {/* Provide unique values for each option */}
            <option value="">Select Level</option>
            <option value="easy">Easy</option>
            <option value="hard">Hard</option>
            <option value="medium">Medium</option>
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
