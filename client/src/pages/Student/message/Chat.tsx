import  { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../../../utils/APIRoutes";
import ChatContainer from "../../../Components/users/Message/ChatContainer";
import Contacts from "../../../Components/users/Message/Contact";
import Welcome from "../../../Components/users/Message/Welcome";
import Nav from  '../../../Components/users/Header/Navbar'

interface Contact {
  _id: string;
  studentname: string;
  // Add other properties as needed
}

interface ContactsData {
  contacts: Contact[];
}


interface User {
  _id: string;
  // Add other user properties as needed
}

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef<Socket | null>(null);
  const [contacts, setContacts] = useState<User[]>([]);

  const [currentChat, setCurrentChat] = useState<User | undefined>();
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = localStorage.getItem("userData");
        if (!userData) {
          navigate("/login");
        } else {
          setCurrentUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchData();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
    
    return () => {
      // Cleanup the socket connection when the component unmounts.
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [currentUser]);

  useEffect(() => {
    async function fetchContacts() {
      try {
        if (currentUser) {
          const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data);
        } 
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    }

    fetchContacts();
  }, [currentUser, navigate]);
  

  const handleChatChange = (chat: User) => {
    setCurrentChat(chat);
  };

  return (
    <>
    <Nav/>
    <Container>
      <div className="container">
      
      <Contacts contacts={contacts} changeChat={handleChatChange} />

        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} />
        )}
      </div>
    </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
