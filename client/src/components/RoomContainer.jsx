import React, { Component } from 'react';
import { useEffect, useState } from 'react';

const RoomContainer = () => {
    const [rooms, setRooms] = useState([]);

    // f(x) to populate rooms onto the home page
    useEffect(() => {
        const getRooms = async () => {
            console.log('in get rooms');
            await fetch('/')
                .then(res => res.json())
                .then(list => {
                    console.log('list: ', list);
                    setRooms(() => rooms.push(list));
                });
            getRooms();
        };
    }, [setRooms]);

    //this is probably wrong
    const showRooms = rooms.map(rm => {
        return <div>{rm}</div>;
    });

    //renders onto the page
    return <div className="roomContainer">{showRooms}</div>;
};

export default RoomContainer;
