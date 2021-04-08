import React, { useState, useEffect } from 'react';
import queryString from 'query-string'; //helps in retrieving data from the url in join component
import io from "socket.io-client";

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const endpoint = 'localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search); //returns object

        socket = io(endpoint); //passed an endpoint to the server

        setName(name);
        setRoom(room);

        socket.emit('join', {name, room}, () => { //when a user joins, an object will be passed with name: name, room: room
        });

        return () => {
            socket.emit('disconnect'); //emitting the disconnect event

            socket.off(); //turns off an instance of the socket
        }
    }, [endpoint, location.search]); //useeffect would only rerender if these 2 values change

    useEffect(() => { //for handling messages
        socket.on('message', (message) => { //listen for message
            setMessages([...messages, message]); //pushes message from system or user to messages array
        })
    }, [messages]); //let useeffect run only when messsages array changes
    
    //function(eventhandler) for sending messages 
    const sendMessage = (event) => { //call event that prevent default from keypress or buttonclick
        event.preventdefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage('')); //when message is sent, input field should clear
        }
    }
    
    // console.log(message, messages);
    //create chatbox
    return (
        <div className="outerContainer">
            <div className="Container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message = {message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat;
