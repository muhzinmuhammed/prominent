import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './SideNav.css'
const SideBar = () => {
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
          <span className="fs-5">Logout</span>
        </a>

      </div>
      
    </div>
  )
}

export default SideBar
