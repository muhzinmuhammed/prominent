import React,{useState} from 'react'

import SideBar from '../../Components/tutor/SideNavbar/SideNav';
import AddLessonInTutor from '../../Components/tutor/AddLesson';

const AddLessonInTutorPage = () => {
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
         
          <AddLessonInTutor Toggle={Toggle}/>
        </div>  
      </div>
    </div>
      
    </div>
  )
}

export default AddLessonInTutorPage
