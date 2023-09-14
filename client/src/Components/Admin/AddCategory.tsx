import React,{useState,useEffect} from 'react'
import Nav from './Header/Nav'
import adminInstance from '../../AxiosEndPoint/adminInstance'
import { useNavigate } from 'react-router-dom'
import {toast,ToastContainer} from 'react-toastify'

const AddCategory: React.FC<AddCategoryProps> = ({ Toggle }) => {
const navigate=useNavigate()
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        
        
        e.preventDefault();
        adminInstance.post('/admin/addCategory',{
            title,
            description
        })
        .then((response) => {
            console.log(response.data);
            toast.success('Category add success full successfully'); 
            // You can use toast for notifications
            navigate('/admin_in_category')

          })
          .catch((error) => {
            console.error(error);
            toast.error('Category alredy exist'); // You can use toast for error notifications
          });

        }
    

    
  return (
    <div className="px-3">
    <Nav Toggle={Toggle} />
    <ToastContainer/>
    
    <h1>Category Table</h1>
    <form  onSubmit={handleSubmit}>
        <div className="container mt-5">

     
  <div className="form-group">
    <label >Add category</label>
    <input type="text" className="form-control w-25" name='title' id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter category" value={title} onChange={(e) => setTitle(e.target.value)}/>
    
  </div>
  <div className="form-group">
    <label >Description</label>
    <input type="text" name='description' className="form-control w-25" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
    
  </div>
  
  
  <button type="submit" className="btn btn-primary mt-5">Submit</button>
  </div>
</form>
  
  </div>
  )
}

export default AddCategory
