import  { useState, useEffect } from "react";
import styled from "styled-components";

interface Contact {
  _id: string;
  studentname: string; // Assuming studentname is a string
  // Add other properties as needed
}

interface ContactsProps {
  contacts: Contact[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changeChat: (chat:any) => void; // Define changeChat function
}
export default function Contacts({ contacts, changeChat }: ContactsProps) {
  const [currentUserName, setCurrentUserName] = useState<string | undefined>(undefined);
  const [currentSelected, setCurrentSelected] = useState<number | undefined>(undefined);
  
  

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await JSON.parse(localStorage.getItem("userData") || "null");

        if (userData) {
          setCurrentUserName(userData.name);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchData();
  }, []);

  const changeCurrentChat = (index: number, contact: Contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <Container>
    {currentUserName && (
      <>
        <div className="brand">
          {/* Your brand content */}
        </div>
        <div className="contacts">
          {contacts.map((contact, index) => (
            <div
              key={contact?._id}
              className={`contact ${index === currentSelected ? "selected" : ""}`}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <div className="username">
                <h3>{contact?.studentname}</h3>
              </div>
            </div>
          ))}
        </div>
      </>
    )}
  </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
