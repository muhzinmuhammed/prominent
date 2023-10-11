import { useState } from "react";

import { IoMdSend } from "react-icons/io";
import styled from "styled-components";


export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  
  
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
       <div className="row">
       <div className="col-lg-10 ">
       <input style={{borderRadius:'10px',height:'50px',width:'550px'}}
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg} 
         
        />
        
       </div>
       <div className="col-lg-2">
       <button type="submit">
          <IoMdSend />
        </button>
       </div>
       </div>
      </form>
    </Container>
  );
}

const Container = styled.div`

 
  
  
 
  
 

  

  
};
`