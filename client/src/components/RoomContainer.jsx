import React from 'react';
import { useEffect, useState } from 'react';

const API = 'http://localhost:3001';

const RoomContainer = () => {
    const [rooms, setRooms] = useState([]);
    const [message, setMessage] = useState('');
    const [textMess, setTextMess] = useState([]);

    const sendMessage = async event => {
        console.log('in sendmess');
        const body = {
            text: message
        };
        console.log('body', body);
        const fetchResponse = await fetch(`${API}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(body)
        });
        console.log('fetchrestxt', fetchResponse);
        const getRes = await fetchResponse.json();
        console.log('getres', getRes);
        setTextMess(getRes);
        event.preventDefault();
    };

    // f(x) to populate rooms onto the home page
    useEffect(() => {
        const getRooms = async () => {
            console.log('in get rooms react');
            const response = await fetch(`${API}/`);
            const json = await response.json();
            console.log('room json', json);
            setRooms(json.rooms);
            setTextMess(json.texts);
        };
        getRooms();
    }, [setRooms]);

    // }, [setMessage]);
    const showTexts = textMess.map(txt => {
        return <div className="textBubble">&nbsp;&nbsp;{txt.text}</div>;
    });

    const showRooms = rooms.map(rm => {
        return (
            <div className="roomCard">
                <header className="roomCardHeader">
                    <h4>
                        <b>{rm.roomName}</b>
                    </h4>
                    <br />
                    <h6>
                        Topic:&nbsp;&nbsp;<b>{rm.topic}</b>
                    </h6>
                </header>
                <div className="roomBox">
                    <div className="messageContainer">{showTexts}</div>
                    <div className="messageBox">
                        <label htmlFor="message">Message:&nbsp;&nbsp; </label>
                        <input
                            name="message"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className="sendMessageButton"
                        onClick={e => sendMessage(e)}
                    >
                        Send
                    </button>
                </div>
            </div>
        );
    });

    //renders onto the page
    return <div className="roomContainer">{showRooms}</div>;
};

export default RoomContainer;
