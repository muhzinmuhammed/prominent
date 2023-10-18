import { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../../../assets/images/robot.gif";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function fetchUserName() {
      try {
        const userData = localStorage.getItem("userData");
        if (userData) {
          const { username } = JSON.parse(userData);
          setUserName(username);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserName();
  }, []);

  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
