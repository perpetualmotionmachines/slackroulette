import React, { useState } from 'react';
import Layout from './Layout';

const API = 'http://localhost:3001';

const CreateRoom = () => {
    // declare state variables
    const [roomInfo, setRoomInfo] = useState({
        roomName: '',
        topic: ''
    });

    //send post request with room info data
    const roomSubmission = event => {
        console.log('in room sub');
        const body = {
            roomName: roomInfo.roomName,
            topic: roomInfo.topic
        };
        fetch(`${API}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON'
            },
            body: JSON.stringify(body)
        })
            .then(res => {
                return res.json();
            })
            .catch(err => {
                console.log(err);
            });
        event.preventDefault();
    };

    const { roomName, topic } = roomInfo;

    const signUpForm = () => {
        return (
            <form>
                <div className="form-group">
                    <label className="text-muted">Room Name</label>
                    <input
                        onChange={e =>
                            setRoomInfo({
                                ...roomInfo,
                                roomName: e.target.value
                            })
                        }
                        type="text"
                        className="form-control"
                        value={roomName}
                    />
                </div>

                <div className="form-group">
                    <label className="text-muted">Topic</label>
                    <input
                        onChange={e =>
                            setRoomInfo({
                                ...roomInfo,
                                topic: e.target.value
                            })
                        }
                        type="text"
                        className="form-control"
                        value={topic}
                    />
                </div>
                <button
                    onClick={e => {
                        roomSubmission(e);
                    }}
                    className="btn btn-primary"
                >
                    Create
                </button>
            </form>
        );
    };

    return (
        <Layout
            title="Create Room"
            description="Create a new room"
            className="container col-md-8 offset-md-2"
        >
            {signUpForm()}
        </Layout>
    );
};

export default CreateRoom;
