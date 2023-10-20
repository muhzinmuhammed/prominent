import {useState} from 'react'

import SideBar from '../../Components/tutor/SideNavbar/SideNav';

import CreateRoom from '../../Components/tutor/VideoCall/OnlineCall';

const VideoCall = () => {
    const [toggle, ] = useState<boolean>(true);

 
  return (
    <div>
      <div className="container-fluid bg-secondary min-vh-100">
      <div className="row">
        {toggle && (
          <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
            <SideBar/>
          </div>
        )}



{toggle&&<div className="col-4 col-md-6 d-flex align-item-center"></div>}
        <div className="col">
          <CreateRoom />
        </div>  
      </div>
    </div>
      
    </div>
  )
}

export default VideoCall
