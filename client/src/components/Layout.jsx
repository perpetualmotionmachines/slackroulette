import React from 'react';
import Menu from './Menu';
import ChatboxMini from './ChatboxMini'
import socketIOClient from "socket.io-client";
import '../stylesheets/styles.css'
import ChatRoom from './chatRoom/ChatRoom'


const Layout = ({
    title = 'Title',
    description = 'description',
    className,
    // children = idk -- probably refers to the "subcomponents" that get rendered in ./Home ???
    children
}) => {

    // opening socket
    // const endpoint = "http://localhost:3001";
    // const socket = socketIOClient(endpoint);
    // socket.on('join', function (data) {
    //   console.log(data);
    //   socket.emit('rsponse', { my: 'data' });
    // });

    //dummy data to populate chatboxminis
    const logs = [];
    let i = 0;
    while (i < 20) {
        logs.push([
            {user: 'Eliot', message: 'pls respond', date: '2020-02-21T03:24:30'},
            {user: 'Tony', message: 'no', date: '2020-02-21T03:25:00'},
            {user: 'Eliot', message: 'pls respond', date: '2020-02-21T03:25:30'},
            {user: 'Tony', message: 'no', date: '2020-02-21T03:26:00'},
            {user: 'Eliot', message: 'pls respond', date: '2020-02-21T03:26:30'},
            {user: 'Tony', message: 'no', date: '2020-02-21T03:27:00'},
          ]);
          i++;
    }
    const chatboxes = [];
    let j = 0;
    //populating layout with chatboxminis
    while (j < 20) {
        chatboxes.push(<ChatRoom key={`mini ${j}`} logs={logs[j]}/>);

        // chatboxes.push(<ChatboxMini key={`mini ${j}`} logs={logs[j]}/>);
        j++;
    }

    return (
        <div>
            <Menu />
            <div className="jumbotron">
                <h2>{title}</h2>
                <p className="lead">{description}</p>
            </div>
            <div className='chatcontainer'>
                {chatboxes}
                </div>
        </div>
    );
};

export default Layout;
