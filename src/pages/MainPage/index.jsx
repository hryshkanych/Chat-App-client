import React from 'react';
import './styles.css'
import avatarGuestPic from '../../assets/avatar-guest.png';
import MainHeader from '../../components/MainHeader';
import ChatItem from '../../components/ChatItem';
import SingleChatHeader from '../../components/SingleChatHeader';
import { FaArrowRight } from 'react-icons/fa';
import { ReceivedMessage, SentMessage } from '../../components/Message';

function MainPage() {
  return (
    <div className="Main-page">
      <div className="General-left-container">
        <MainHeader/>
        <div className="Chats-container"> 
            <a className="Chat-text">Chats</a>
            <ChatItem
                avatarSrc={avatarGuestPic}
                name="Khrystik"
                message="Hi! No, I am going for a walk."
                date="Aug 16, 2022"
                status="online"
            />
            <ChatItem
                avatarSrc={avatarGuestPic}
                name="Vasylko"
                message="I love Khrystik very much"
                date="Aug 16, 2022"
                status="offline"
            />
        </div>
      </div>
      <div className="General-right-container">
        <SingleChatHeader/>
        <div className="Conversation-container">
          <ReceivedMessage text="Hi, how are you?" time="8/17/2022, 7:43 AM" />
          <SentMessage text="Not bad. What about you?" time="8/17/2022, 7:45 AM" />
          <SentMessage text="How was your meeting?" time="8/17/2022, 7:48 AM" />
        </div>
        <div className="Sending-message-container">
          <div className="Message-input-container">
                <input 
                    type="text" 
                    className="message-input" 
                    placeholder="Type your message" 
                />
                <FaArrowRight className="arrow-icon" /> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;