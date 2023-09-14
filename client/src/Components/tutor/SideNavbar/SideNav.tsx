import React,{useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './SideNav.css'
import { useDispatch } from 'react-redux'
import { logout, signup } from '../../../features/tutorSlice/tutorSlice'
import { useNavigate } from 'react-router-dom'
const SideBar = () => {
  const navigate=useNavigate()
  const hanldeSignout = () => {
        
        
    localStorage.clear("tutorToken");
    localStorage.clear("tutorData");
    
    dispatch(logout());
    navigate('/tutor_login')
  };
  const dispatch=useDispatch()
  useEffect(() => {
    const storedUserData = localStorage.getItem("tutorData");
    
    

    const parsedUserData = JSON.parse(storedUserData);

    dispatch(signup(parsedUserData));
  }, [dispatch]);
  return (
    <div className='bg-white sidebar p-2'>
      <div className='m-2'>
        <i className='bi bi-bootstrap-fill me-2 fs-4'></i>
        <span className='brand-name fs-4 me-3'>Prominent</span>
      </div>
      <hr className='text-dark' />
      <div className="list-group list-group-flush">
        <a className='list-group-item py-2 me-3' href='/tutor_dashboard'>
          <i className='bi bi-speedometer2 fs-5 me-2' ></i>
          <span className="fs-5">DashBoard</span>
        </a>
       
        
       
       
        <a className='list-group-item py-2 me-3' href='/add_lesson'>
        <i className="bi bi-people fs-4 me-2"></i>
          <span className="fs-5">Add Lesson</span>
        </a>
       
        <a className='list-group-item py-2 me-3' href='/course_view_tutor'>
        <i className="bi bi-eye fs-4 me-2"></i>
          <span className="fs-5">View Course</span>
        </a>
        <a className='list-group-item py-2 me-3' href='/add_course'>
        <i className="bi bi-plus fs-4 me-2"></i>
          <span className="fs-5">Add Course</span>
        </a>
        <a className='list-group-item py-2 me-3'>
        <i className="bi bi-power fs-4 me-2"></i>
          <span className="fs-5"onClick={hanldeSignout}>Logout</span>
        </a>

      </div>
      
    </div>
  )
}

export default SideBar
