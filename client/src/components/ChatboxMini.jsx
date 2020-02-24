import React from 'react';

const ChatBoxMini = ({ logs }) => {
    const display = [];
    for (let value of logs) {
        display.push(
            <div key={`value ${value.user} ${value.date}`}>
                <p>{value.user}:</p>
                <p>{value.message}</p>
            </div>
        );
    }

    return (
        <div className="chatbox">
            <h2>{display}</h2>
        </div>
    );
};

export default ChatBoxMini;
