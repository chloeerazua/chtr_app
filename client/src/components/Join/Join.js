import React, { useState } from 'react';
import { Link } from 'react-router-dom'; //to link to /chat path

import './Join.css';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
      <div className="joinOuterContainer">
         <div className="joinInnerContainer">
           <h1 className="heading">Chtr</h1>
           <div><input placeholder="Hey, what's your name?" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
           <div><input placeholder="What's your room name?" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
           <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}> 
             <button className="button mt-20" type="submit">Join Room</button>
           </Link>
         </div>
      </div>
  );
}

export default Join;
