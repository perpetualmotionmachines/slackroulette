import React from 'react';
import Layout from './Layout';
import RoomContainer from './RoomContainer';

const Home = () => {
    return (
        <div>
            <Layout
                title="SlackRoulette"
                description="Join a room to chat about a topic"
                className="container-fluid"
            />
            <div className="roomContainer">
                <RoomContainer />
            </div>
        </div>
    );
};

export default Home;
