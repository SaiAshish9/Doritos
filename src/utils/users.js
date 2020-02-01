const users = []

const addUser = ({ id, username, room }) => {
    // Clean the data
    username = username
    room = room

    // Validate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required!'
        }
    }

    // Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    // Validate username


    // Store user
    const user = { id, username, room }
  {
    if(!existingUser){
      users.push(user)

    }

     console.log(users);
     console.log(users.length);
       return { user }
  }

}

const userslength=(users)=>{
  return users.length;
}

console.log(userslength(users));
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room)
}

module.exports = {
    userslength,
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}
