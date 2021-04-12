import { useState } from 'react';

import './Input.css';

const Input = ({ sendMessage }) => {
  const [message, setMessage ] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  return(
  <form className="form" onSubmit = {handleSubmit}>
    <input
      className="input"
      type="text"
      placeholder="Type a message to the room..."
      value={message}
      onChange={(event) => setMessage(event.target.value)}
    />
    <button className="sendButton">Send</button>
  </form>
  );
};

export default Input;
