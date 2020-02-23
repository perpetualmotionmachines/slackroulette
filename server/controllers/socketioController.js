// An array that holds the users in an individual room -- socketio should manage this for us
// REFACTOR ALERT: We should probably have a room model that manages this for us rather than relying on socketio
const usersInRoom = [];

/**
 * This function is invoked by io in server.js on 'join' (built in socketio method)
 * it creates a user with prop name and prop room
 */
const addUser = ({ id, name, room }) => {
    // reassigning variables lololol
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // Checks to see if a user with that name is already in the room
    const existingUser = usersInRoom.find(
        user => user.room === room && user.name === name
    );

    // If we didndt receive a name or room, return an error and prevent joining the room
    if (!name || !room) return { error: 'Username and room are required.' };
    if (existingUser) return { error: 'Username is taken.' };

    const user = { id, name, room };

    usersInRoom.push(user);

    // return the user that we've added to the room back to server.js as an obj
    return { user };
};

//
const removeUser = id => {
    const index = usersInRoom.findIndex(user => user.id === id);

    if (index !== -1) return usersInRoom.splice(index, 1)[0];
};

const getUser = id => usersInRoom.find(user => user.id === id);

const getUsersInRoom = room => usersInRoom.filter(user => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
