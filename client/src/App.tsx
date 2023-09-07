import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Student/HomePage';
import Login from './Components/users/Login/Login';
import Signup from './Components/users/Signup/Signup';
import TutorLogin from './Components/tutor/Login/login';
import TutorSignup from './Components/tutor/signup/signup';
import Sidebar from './Components/tutor/SideNavbar/SideNav';
import UserInAdmin from './pages/Admin/UserInadmin';

import AddCourse from './pages/tutor/AddCourse';
import AdminLogin from './Components/Admin/AdminLogin';
import InstructorInAdmin from './pages/Admin/InstructorInAdmin';
import AdminAddCourse from './pages/Admin/AddCourse';
import UserOtp from './Components/users/Signup/otp';
import CategoryPage from './pages/Admin/Category';
import AddCategory from './pages/Admin/AddCategory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tutor_login" element={<TutorLogin />} />
        <Route path="/tutor_signup" element={<TutorSignup />} />
        <Route path="/user_otp" element={<UserOtp />} />

        <Route path="/tutor_home" element={<Sidebar />} />
        <Route path="/add_course" element={<AddCourse />} />
        <Route path="/admin_in_students" element={<UserInAdmin />} />
        <Route path="/admin_login" element={<AdminLogin />} />
        <Route path="/admin_in_instructor" element={<InstructorInAdmin />} />
        <Route path="/admin_add_course" element={<AdminAddCourse />} />
        <Route path="/admin_in_category" element={< CategoryPage />} />
        <Route path="/admin_add_category" element={< AddCategory />} />

      </Routes>
    </Router>
  );
}

export default App;
