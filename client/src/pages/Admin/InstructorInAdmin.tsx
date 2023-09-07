import React,{useState} from 'react'
import InstructorTable from '../../Components/Admin/InstructorsTable';
import SideBar from '../../Components/Admin/Header/SideBar';
const InstructorInAdmin = () => {
  const [toggle, setToggle] = useState<boolean>(true);

  const Toggle = () => {
    setToggle(!toggle);
  };
  return (
    <div>
      <div className="container-fluid bg-secondary min-vh-100">
      <div className="row">
        {toggle && (
          <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
            <SideBar  />
          </div>
        )}



{toggle&&<div className="col-4 col-md-2"></div>}
        <div className="col">
          <InstructorTable Toggle={Toggle}/>
        </div>
      </div>
    </div>
      
    </div>
  )
}

export default InstructorInAdmin
