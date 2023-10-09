import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import tutoraxiosinstance from '../../AxiosEndPoint/tutorInstance'
import Nav from './SideNavbar/Nav'

const LessonsDetails = ({Toggle}) => {
    const{id}=useParams()
    const baseVideo =
    "https://res.cloudinary.com/dfnwvbiyy/video/upload/v1694365110/";
   
    
    const [lessons,setLessons]=useState([])
    useEffect(()=>{
        tutoraxiosinstance.get(`/instructor/get_lessons/${id}`)
        .then((response)=>{
            console.log(response.data,"ppp");
            
            setLessons(response.data.allLessons)
        }).catch((err)=>{
            console.log(err.message);
            
        })

    },[])
  return (
    <div className="px-3">
        <Nav Toggle={Toggle} />
        <h1>Lesson  Table</h1>
        <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Duration</th>
      <th scope="col">Description</th>
      <th scope="col">Video</th>
    </tr>
  </thead>
  <tbody>
 {lessons.map((less,index)=>(
  <tr>
  <td>{index+1}</td>
  <td>{less.title}</td>
  <td>{less.duration}</td>
  <td>{less.description}</td>
  <td><video controls style={{width:'100px'}}  src={`${baseVideo}/${less.video}`}/></td>
</tr>

 ))}
    
    
  </tbody>
</table>

      
    </div>
  )
}

export default LessonsDetails
