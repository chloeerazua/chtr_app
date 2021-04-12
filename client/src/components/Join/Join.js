import React, { useState } from 'react';
import { Link } from 'react-router-dom'; //to link to /chat path

import './Join.css';

const Join = () => {
    const [values, setValues] = useState({ name: "", room: "" });
    
    const updateValue = (event) => {
      setValues({...values, [event.target.name]: event.target.value });
    };

    return (
      <div className="joinOuterContainer">
         <div className="joinInnerContainer">
           <h1 className="heading">Chtr</h1>
           <div>
             <input 
             placeholder="Hey, what's your name?" 
             className="joinInput" 
             name = "name"
             values = {values.name}
             onChange = {updateValue}
             />
           </div>
           <div>
             <input 
             placeholder="What's your room name?" 
             className="joinInput mt-20" 
             name = "room"
             value = {values.room}
             onChange = {updateValue}
             />
           </div>
           <Link to={`/chat?name=${values.name}&room=${values.room}`}> 
             <button className="button mt-20" type="button">Join Room</button>
           </Link>
         </div>
      </div>
  );
}

export default Join;
