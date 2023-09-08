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
        <a className='list-group-item py-2 me-3'>
          <i className='bi bi-speedometer2 fs-5 me-2' ></i>
          <span className="fs-5">DashBoard</span>
        </a>
       
        <a className='list-group-item py-2 me-3' href='/home'>
          <i className='bi bi-house fs-4 me-2'></i>
          <span className="fs-5">Home</span>
        </a>
        <a className='list-group-item py-2 me-3' href='/admin_in_students'>
        <i className="bi bi-people fs-4 me-2"></i>
          <span className="fs-5">Student</span>
        </a>
        <a className='list-group-item py-2 me-3' href='/admin_in_instructor'>
        <i className="bi bi-person-badge fs-4 me-2"></i>
          <span className="fs-5">Instructor</span>
        </a>
        <a className='list-group-item py-2 me-3' href='/admin_in_category'>
        <i className="bi bi-person-badge fs-4 me-2"></i>
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
