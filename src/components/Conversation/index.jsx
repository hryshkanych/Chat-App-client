import React, { useEffect, useRef } from 'react';
import { ReceivedMessage, SentMessage } from '../Message';
import './styles.css';
import { useUserContext } from '../../contexts/userContext';

const Conversation = ({ messages }) => {
  const { user } = useUserContext();
  const conversationEndRef = useRef(null);

  useEffect(() => {
    if (conversationEndRef.current) {
      conversationEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]); 

  return (
    <div className="Conversation-container">
      {messages.map((msg, index) => (
        msg.senderId === user.id ? 
          <SentMessage key={index} text={msg.text} createdAt={new Date(msg.createdAt).toLocaleString()} /> :
          <ReceivedMessage key={index} text={msg.text} createdAt={new Date(msg.createdAt).toLocaleString()} />
      ))}
      <div ref={conversationEndRef} /> 
    </div>
  );
};

export default Conversation;
