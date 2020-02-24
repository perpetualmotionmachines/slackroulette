import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import IndividualMessage from './IndividualMessage';

const MessagesContainer = ({ messages, name }) => (
    // Helps us scroll perpetually to the bottom
    <ScrollToBottom className="messages">
        {/* EACH MESSAGE generates a div and an index */}
        {messages.map((message, i) => (
            // assigns an individual key to each message
            <div key={i}>
                <IndividualMessage message={message} name={name} />
            </div>
        ))}
    </ScrollToBottom>
);

export default MessagesContainer;
