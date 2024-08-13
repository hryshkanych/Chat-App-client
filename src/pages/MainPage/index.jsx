import React from 'react';
import './styles.css'
import avatarGuestPic from '../../assets/avatar-guest.png';
import Header from '../../components/Header';
import ChatItem from '../../components/ChatItem';

function MainPage() {
  return (
    <div className="Main-page">
      <div className="General-left-container">
        <Header/>
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
      <div className="General-right-container"></div>
    </div>
  );
}

export default MainPage;