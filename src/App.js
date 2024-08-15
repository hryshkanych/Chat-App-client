import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/userContext';
import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignupPage';
import SignInPage from './pages/SigninPage';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <main>
            <Routes>
              <Route path="/" element={<SignInPage/>} />
              <Route path="/signup" element={<SignUpPage/>} />
              <Route path="/signin" element={<SignInPage/>} />
              <Route path="/chatting" element={<MainPage/>} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
