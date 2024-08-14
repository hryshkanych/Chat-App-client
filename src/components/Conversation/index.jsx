import React from 'react';
import { ReceivedMessage, SentMessage } from '../Message';
import './styles.css';

const Conversation = () => {
  return (
    <div className="Conversation-container">
      <ReceivedMessage text="Hi, how are you?" time="8/17/2022, 7:43 AM" />
      <SentMessage text="Not bad. What about you?" time="8/17/2022, 7:45 AM" />
      <SentMessage text="How was your meeting?" time="8/17/2022, 7:48 AM" />
    </div>
  );
};

export default Conversation;
