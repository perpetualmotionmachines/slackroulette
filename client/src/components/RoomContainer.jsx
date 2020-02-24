import React from 'react';
import { useEffect, useState } from 'react';

const API = 'http://localhost:3001';

const RoomContainer = () => {
    const [rooms, setRooms] = useState([]);

    // f(x) to populate rooms onto the home page
    useEffect(() => {
        const getRooms = async () => {
            console.log('in get rooms react');
            const response = await fetch(`${API}/`);
            console.log('fetch complete');
            const json = await response.json();
            console.log('fetchres', json);
            console.log('data received');
            setRooms(json);
        };
        getRooms();
    }, [setRooms]);

    //this is probably wrong
    console.log('rm', rooms[0]);
    const showRooms = rooms.map(rm => {
        console.log(rm);
        return (
            <div className="roomCard">
                <header className="roomCardHeader">
                    {rm.roomName}
                    <br />
                    {rm.topic}
                </header>
                <div className="roomBox"></div>
            </div>
        );
    });

    //renders onto the page
    return <div className="roomContainer">{showRooms}</div>;
};

export default RoomContainer;
