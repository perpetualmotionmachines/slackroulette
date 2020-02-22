import React, { useState } from 'react';

const CreateRoom = () => {
// declare state variables
    const [ roomInfo, setRoomInfo ] = useState({
        roomName: '',
        topic: ''
    });

//send post request with room info data
    const roomSubmission = () => {
        const body = {
            roomName: roomInfo.roomName,
            topic: roomInfo.topic
        }
      fetch('/create', {
            method: 'POST',
            headers: {
              "Content-Type": "Application/JSON"
            },
            body: JSON.stringify(body)
        });
    }

    const { roomName, topic } = roomInfo;

    return (
        <div className="createRoomContainer">
            <h2>Create Room</h2>
            <label>
                Room Name:
                <input type="text" name="roomName" value={roomName} onChange={setRoomInfo({roomName: e.target.value})} />
            </label>
            <label>
                Topic:
                <input type="text" name="topic" value={topic} onChange={setRoomInfo({topic: e.target.value})} />
            </label>
            <button type="submit" onClick={() => {roomSubmission()}}>
                Sign Up
            </button>
        </div>
    )
}

export default CreateRoom;