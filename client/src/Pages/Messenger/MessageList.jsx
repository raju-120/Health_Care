// src/components/MessageList.js
import React from 'react';

const MessageList = ({ messages, username }) => {
  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index} style={{ textAlign: msg.from === username ? 'right' : 'left' }}>
          <strong>{msg.from}:</strong> {msg.message}
          {msg.from === username && msg.readBy.includes(msg.to) && (
            <span> (Read)</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList;