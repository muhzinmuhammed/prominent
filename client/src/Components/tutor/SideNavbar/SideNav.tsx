import {useState} from "react";
import "./SideNav.css";
import {
  BsSpeedometer2,
  
  
  BsJustifyLeft,
 
} from "react-icons/bs";
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from "react-router-dom";

const SideNav = () => {
    const [navCollapse,setNavCollapse]=useState(false)
    const [smallNavCollapse,setSmallNavCollapse]=useState(false)
  return (
    
    <div>
      <nav className="nav">
        <div className="logo">
        <h2>Prominent</h2>
        <div className="largeDeviceIcon">
        <BsJustifyLeft onClick={e=> setNavCollapse(!navCollapse)} style={{ fontSize: '30px',cursor: 'pointer' }}/>
        </div>
        <div className="smallDeviceIcon">
        <BsJustifyLeft onClick={e=> setSmallNavCollapse(!smallNavCollapse)} style={{ fontSize: '30px',cursor: 'pointer' }}/>
        </div>
        </div>
       
        <ul>
          <li>Home</li>
          <li>New Blog</li>
        </ul>
      </nav>
      <div className="sidebar_content">
      <div className={`${smallNavCollapse ? "smallNav":""} sidebar-conatiner ${navCollapse ? "navCollapse":""}`}>
        <div className="nav-option option1">
          <BsSpeedometer2 style={{ fontSize: '30px',cursor: 'pointer' }}/>
          <h3>DashBoard</h3>
        </div>
      </div>
      <div className={`${smallNavCollapse ? "smallNav":""} sidebar-conatiner ${navCollapse ? "navCollapse":""}`}>
        <div className="nav-option option1"style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'black' }}>
        <Link to="/add_course" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'black' }}>
    <AiOutlinePlus style={{ fontSize: '30px', cursor: 'pointer' }} />
    <h3 style={{ marginLeft: '10px', marginBottom: '0', textDecoration: 'none' }}>Add Course</h3>
</Link>
        </div>
      </div>
      
    
      
      
      
      </div>
    </div>
  );
};

export default SideNav;
