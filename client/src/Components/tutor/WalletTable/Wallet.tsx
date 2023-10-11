import React,{useEffect,useState} from 'react'
import Table from 'react-bootstrap/Table';
import axiosInstance from '../../../AxiosEndPoint/axiosEnd';
import { json } from 'react-router-dom';
import NavbarHeader from '../../users/Header/Navbar';
import { Container } from 'react-bootstrap';

const Wallet = () => {
  const userData=JSON.parse(localStorage.getItem("userData"))
  const id=userData?._id
  
  
  
  
    const [wallet,setWallet]=useState([])
    useEffect(()=>{
        axiosInstance.get(`/student/wallet/${id}`)
        .then((response)=>{
          console.log(response.data);
          
          setWallet(response.data.wallet)
        })
    },[])
  return (
    <>
    <NavbarHeader/>
    <div style={{marginTop:'100px'}}>
      <Container>
       <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>course</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody> 
      {wallet.map((walletItem, index) => (
         <tr>
          <td>
            
            {index+1}
          </td>
          <td>
            
            {walletItem.courseId?.coursename}
          </td>
          <td>
            
            {walletItem.courseId?.coursefee}
          </td>
          <td>
            
          {new Date(walletItem.createdAt).toLocaleDateString()}
          </td>
          
         </tr>
        ))}
       
        <tr>
         
        </tr>
        
      </tbody>
    </Table>
    </Container>
    </div>
    </>
  )
}

export default Wallet
