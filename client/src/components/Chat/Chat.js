import React, { useState, useEffect, useRef } from 'react';
import queryString from 'query-string'; //helps in retrieving data from the url in join component
import io from "socket.io-client";

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

const ENDPOINT = 'localhost:5000';

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);

    const socket = useRef(null);

    useEffect(() => {
        const { name, room } = queryString.parse(location.search); //returns object
        setName(name);
        setRoom(room);

        socket.current = io(ENDPOINT); //passed an endpoint to the server

        socket.current.on("connect", () => {
            socket.current.emit('join', {name, room}); //when a user joins, an object will be passed with name: name, room: room
        });

        socket.current.on("message", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        //return () => {
            //socket.emit('disconnect'); //emitting the disconnect event

            //socket.off(); //turns off an instance of the socket
        //}
    }, [location.search]); //useeffect would only rerender if these 2 values change

    //useEffect(() => { //for handling messages
      //  socket.on('message', (message) => { //listen for message
        //    setMessages([...messages, message]); //pushes message from system or user to messages array
        // })
    //}, [messages]); //let useeffect run only when messsages array changes
    
    //function(eventhandler) for sending messages 
    const sendMessage = (message) => { //call event that prevent default from keypress or buttonclick
        if(message) {
            socket.current.emit("sendMessage", message); //when message is sent, input field should clear
        }
    }
    
    // console.log(message, messages);
    //create chatbox
    return (
        <div className="outerContainer">
            <div className="Container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat;
