import React from 'react';
import { ReceivedMessage, SentMessage } from '../Message';
import './styles.css';
import { useUserContext } from '../../contexts/userContext';

const Conversation = ({ messages }) => {
  const { user } = useUserContext();

  return (
    <div className="Conversation-container">
      {messages.map((msg, index) => (
        msg.senderId === user.id ? 
          <SentMessage key={index} text={msg.text} time={new Date(msg.createdAt).toLocaleString()} /> :
          <ReceivedMessage key={index} text={msg.text} time={new Date(msg.createdAt).toLocaleString()} />
      ))}
    </div>
  );
};

export default Conversation;
