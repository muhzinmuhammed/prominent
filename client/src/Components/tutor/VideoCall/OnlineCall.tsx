import {useState} from 'react'
import { useNavigate } from 'react-router-dom'


const CreateRoom = ({Toggle}) => {
    const navigate=useNavigate()
    const [roomeCode,setRoomCode]=useState('')
    const handleSubmit=(e)=>{
        e.preventDefault()
        navigate(`/room/${roomeCode}`)
    }
  return (
    <div className='home-page'>
      <form onSubmit={handleSubmit} className="form">
      <div className="d-flex align-items-center mt-5">
            
            <input type='text' value={roomeCode} onChange={e=>setRoomCode(e.target.value)} required placeholder='enter room ' />
        </div>
        <button className='btn btn-info mt-5 ms-5 text-white' type='submit'>Room Number</button>
      </form>
    </div>
  )
}

export default CreateRoom