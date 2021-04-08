const express = require('express');
const socketio = require('socket.io'); //decided to use web sockets instead of http request as its a real time app
const http = require('http');
const router = require('./router');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

const PORT = 5000;

const app = express(); //app initialized from express
const server = http.createServer(app); //server initialization
const io = socketio(server); //created an instance of socketio

io.on('connection', (socket) => { //when a socket connects //socket is connected as a client side socket
    console.log('A user has connected!');

    socket.on('join', ({ name, room }, callback) => { //when a user joins
        const { error, user } = addUser({ id: socket.id, name, room }); //addUser returns either user or error

        if(error) return callback(error);

        //if no error 

        socket.emit('message', { user: 'admin', text: '${user.name}, welcome to ${user.room}' }); //system generated message to user that just joined
        socket.broadcoast.to(user.room).emit('message', { user: 'admin', text: '${user.name}, just joined! '}); //system generated message to other users in the room

        socket.join(user.room); //joins user to room

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});

        callback();
    });

    socket.on('sendMessage', (message, callback) => { //listens for sendMessage event
        const user = getUser(socket.id); //to get user who sent a message

        io.to(user.room).emit('message', { user: user.name, text: message}); //message is from frontend.. is sent to the room

        callback(); 
    });

    socket.on('disconnect', () => {
        // console.log('User has disconnected');
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message', { user: 'admin', text: '${user.name} has left'});
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
    })
})
app.use(router); //called router as the middleware

server.listen(PORT, () => console.log('Server has started on port ${PORT}'));
