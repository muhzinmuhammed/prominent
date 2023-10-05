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
import TutorOrderPage from "./pages/tutor/Order";
import CreateRoom from "./Components/tutor/VideoCall/OnlineCall";
import Room from "./Components/tutor/VideoCall/Room";
import VideoCall from "./pages/Admin/VideoCall";
import JoinRoom from "./pages/Student/StudentCall";
import Chat from "./pages/Student/message/Chat";
import EntrolledCourse from "./Components/users/CoursePage/EntrolledCourse";
import ForgetPassword from "./Components/users/ForegetPassword/Forgettpassoword";
import ForgetOtp from "./Components/users/ForegetPassword/forgetOtp";
import NewPassword from "./Components/users/ForegetPassword/newPassword";
import Certificate from "./Components/users/Certificate/Certificate";


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
        <Route path="/certificates/:id" element={<Certificate />} />
      

        <Route path="/tutors" element={<TutorPage />} />
        <Route path="/tutor_details/:id" element={<TutorDetailsPage />} />
        <Route path="/course_details/:id" element={<CourseDetailPage />} />
        <Route path="/entroll_course/:id" element={<EntrolledCourse />} />
        <Route path='/join_room' element={<JoinRoom/>}/>
        <Route path='/forget_password' element={<ForgetPassword/>}/>
        <Route path='/user_forget_otp' element={<ForgetOtp/>}/>
        <Route path='/new_password' element={<NewPassword/>}/>
        <Route path="/message" element={<Chat />} />

     
        {/* student routes */}

        {/* insructor routes */}
        <Route path="/tutor_login" element={<TutorLogin />} />
        <Route path="/tutor_signup" element={<TutorSignup />} />
        <Route path="/course_view_tutor" element={<CourseTable />} />

        <Route path='/create_room' element={<VideoCall/>}/>
          <Route path='/room/:roomId' element={<Room/>}/>

        <Route path="/add_course" element={<AddCourse />} />
        <Route path="/edit_course/:id" element={<EditCourse />} />
        <Route path="/add_lesson" element={<AddLessonInTutorPage />} />
        <Route path="/orders" element={<TutorOrderPage />} />
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
