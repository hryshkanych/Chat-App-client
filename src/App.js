import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/index';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<MainPage/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
