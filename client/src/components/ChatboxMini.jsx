import React from 'react';
import '../stylesheets/styles.css'

function zoom () {
    
}

const ChatBoxMini = ({ logs }) => {
    const display = [];
    //populate display for each mini chat box with the user, message, and date info from server
    for (let value of logs) {
        display.push(
          <div key={`value ${value.user} ${value.date}`} onClick={zoom}>
          <p>{value.user}:</p>
          <p>{value.message}</p>
          <p>{value.date}</p>
          </div>
        )
}
    return (
        <div className="chatbox">
        <h2>{display}</h2>
        </div>
    );
};

export default ChatBoxMini;
