import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Student/HomePage";
import Login from "./Components/users/Login/Login";
import Signup from "./Components/users/Signup/Signup";
import TutorLogin from "./Components/tutor/Login/login";
import TutorSignup from "./Components/tutor/signup/signup";

import UserInAdmin from "./pages/Admin/UserInadmin";

import AddCourse from "./pages/tutor/AddCourse";
import AdminLogin from "./Components/Admin/AdminLogin";
import InstructorInAdmin from "./pages/Admin/InstructorInAdmin";

import UserOtp from "./Components/users/Signup/otp";
import CategoryPage from "./pages/Admin/Category";
import AddCategory from "./pages/Admin/AddCategory";
import AddLessonInTutorPage from "./pages/tutor/AddLesson";
import CoursePageStudent from "./pages/Student/CoursePage";
import TutorPage from "./pages/Student/TutorPage";
import TutorDetailsPage from "./pages/Student/TutorDetails";
import CourseDetailPage from "./pages/Student/CourseDetailPage";
import CoursePageAdmin from "./pages/Admin/CourseTable";
import CourseTable from "./pages/tutor/courseTable";

import EditCourse from "./pages/tutor/EditCourse";
import OrderPage from "./pages/Admin/OrderPage";


function App() {
  return (
    <Router>
      <Routes>
        {/* student routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user_otp" element={<UserOtp />} />

        <Route path="/courses" element={<CoursePageStudent />} />
      

        <Route path="/tutors" element={<TutorPage />} />
        <Route path="/tutor_details" element={<TutorDetailsPage />} />
        <Route path="/course_details/:id" element={<CourseDetailPage />} />
     
        {/* student routes */}

        {/* insructor routes */}
        <Route path="/tutor_login" element={<TutorLogin />} />
        <Route path="/tutor_signup" element={<TutorSignup />} />
        <Route path="/course_view_tutor" element={<CourseTable />} />

        <Route path="/add_course" element={<AddCourse />} />
        <Route path="/edit_course/:id" element={<EditCourse />} />
        <Route path="/add_lesson" element={<AddLessonInTutorPage />} />
        <Route path="/orders" element={<OrderPage />} />
        {/* insructor routes */}

        {/* admin routes */}

        <Route path="/admin_in_students" element={<UserInAdmin />} />
        <Route path="/admin_login" element={<AdminLogin />} />
        <Route path="/admin_in_instructor" element={<InstructorInAdmin />} />

        <Route path="/admin_in_category" element={<CategoryPage />} />
        <Route path="/admin_add_category" element={<AddCategory />} />
        <Route path="/get_all_course_admin" element={<CoursePageAdmin />} />
        <Route path="/admin_order" element={<OrderPage />} />
        {/* admin routes */}
      </Routes>
    </Router>
  );
}

export default App;
