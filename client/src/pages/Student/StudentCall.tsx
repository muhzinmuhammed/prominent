import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JoinRoom.css'; // Import your CSS file for styling

const JoinRoom = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/room/${roomCode}`);
  };

  return (
    <div className='join-room'>
      <h1>Join a Room</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-container">
          <input
            type='text'
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            required
            placeholder='Enter Room Code'
          />
          <button className='btn btn-info' type='submit'>Join Room</button>
        </div>
      </form>
    </div>
  );
};

export default JoinRoom;
