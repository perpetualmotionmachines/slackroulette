import React, { useState, useEffect } from 'react';
import querystring from 'query-string';
import io from 'socket.io-client';

let socket;

// creating state using react hooks
const ChatBox = ({ location }) => {
    const [name, setName] =  useState('');
    const [users, setUsers] = useState('');
    const [room, setRoom] =  useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    

// const END_POINT  =  'URL'


useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit('join', { name, room }, error => {
        if (error) {
            alert(error);
        }
    });
}, [ENDPOINT, location.search]);

useEffect(() => {
    socket.on('message', message => {
        setMessages([...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
        setUsers(users);
    });

    return () => {
        socket.emit('disconnect');

        socket.off();
    };
}, [messages]);

const sendMessage = event => {
    event.preventDefault();

    if (message) {
        socket.emit('sendMessage', message, () => setMessage(''));
    }
};

return (
    <div className="outerContainer">
        <div className="container">
            <InfoBar room={room} />
            <Messages messages={messages} name={name} />
            <Input
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
            />
        </div>
        <TextContainer users={users} />
    </div>
);
};

export default Chat;









