//helper functions to manage users

const users = [];

const addUser = ({ id, name, room }) => {

  if(!name || !room) {
    return { error: 'Username and room are required.' };
  }
  
  name = name.trim().toLowerCase(); //Chloe Erazua = chloeerazua
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name); //newuser cant sign up in the same room with same username with existing user

  if(existingUser) {
    return { error: 'Username is taken.' };
  }

  const user = { id, name, room }; //create new user

  users.push(user); //push user to users array

  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) {
    return users.splice(index, 1)[0]; //remove user from user array
  }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
