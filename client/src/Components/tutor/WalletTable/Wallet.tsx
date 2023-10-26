import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axiosInstance from '../../../AxiosEndPoint/axiosEnd';
import NavbarHeader from '../../users/Header/Navbar';
import { Container } from 'react-bootstrap';

interface Wallet {
  courseId: {
    coursename: string;
    coursefee: number;
    createdAt: string; // Use string type for date as it comes from the API
  };
}

const Wallet: React.FC = () => {
  
  const userData: { _id: string } | null = JSON.parse(localStorage.getItem("userData") || 'null') as { _id: string } | null;
  

  const id = userData ? userData._id : null;

  

  const [wallet, setWallet] = useState<Wallet[] | null>(null);

  useEffect(() => {
    if (id) {
      axiosInstance.get(`/student/wallet/${id}`)
        .then((response) => {
          console.log(response.data);
          setWallet(response.data.wallet);
        });
    }
  }, [id]);

  return (
    <>
      <NavbarHeader />
      <div style={{ marginTop: '100px' }}>
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
              {wallet?.map((walletItem, index) => (
                <tr key={index}>
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    {walletItem?.courseId?.coursename}
                  </td>
                  <td>
                    {walletItem?.courseId?.coursefee}
                  </td>
                  <td>
                    {new Date(walletItem?.courseId?.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </>
  );
}

export default Wallet;
