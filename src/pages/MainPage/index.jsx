import React from 'react';
import './styles.css'
import Header from '../../components/Header';

function MainPage() {
  return (
    <div className="Main-page">
      <div className="General-left-container">
        <Header/>
      </div>
      <div className="General-right-container"></div>
    </div>
  );
}

export default MainPage;