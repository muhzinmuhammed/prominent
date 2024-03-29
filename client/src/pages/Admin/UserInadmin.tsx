import React, { useState } from 'react';
import SideBar from '../../Components/Admin/Header/SideBar';
import Home from '../../Components/Admin/StudentsTable';

const UserInAdmin: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(true);

  const Toggle = () => {
    setToggle(!toggle);
  };
 
  

  return (
    <div className="container-fluid bg-secondary min-vh-100">
      <div className="row">
        {toggle && (
          <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
            <SideBar  />
          </div>
        )}



{toggle&&<div className="col-4 col-md-2"></div>}
        <div className="col">
          <Home Toggle={Toggle}/>
        </div>
      </div>
    </div>
  );
};

export default UserInAdmin;
