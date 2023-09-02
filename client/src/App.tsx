import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './Components/users/Login/Login';
import Signup from './Components/users/Signup/Signup';
import TutorLogin from './Components/tutor/Login/login';
import TutorSignup from './Components/tutor/signup/signup';
import Sidebar from './Components/tutor/SideNavbar/SideNav';
import SidebarAdmin from './pages/Admin/SideBar';

import AddCourse from './pages/tutor/AddCourse';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tutor_login" element={<TutorLogin />} />
        <Route path="/tutor_signup" element={<TutorSignup />} />
        <Route path="/tutor_home" element={<Sidebar />} />
        <Route path="/add_course" element={<AddCourse />} />
        <Route path="/admin" element={<SidebarAdmin />} />

      </Routes>
    </Router>
  );
}

export default App;
