import React from 'react';
import './ChatBubble.css';

const ChatBubble = ({ role, text }) => {
  return (
    <div className={`chatItemcc ${role === "user" ? 'userChatItemcc' : 'modelChatItemcc'}`}>
      <p className="chatTextcc">{text}</p>
    </div>
  );
};

export default ChatBubble;
