import React from 'react';
import { Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider, useUserContext } from './contexts/userContext';
import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignupPage';
import SignInPage from './pages/SigninPage';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { user } = useUserContext();
  return (
      <Router>
        <div className="App">
          <main>
            <Routes>
              <Route path="/" element={user ? <MainPage /> : <Navigate to={"/signin"} />} />
              <Route path="/signup" element={<SignUpPage/>} />
              <Route path="/signin" element={<SignInPage/>} />
              <Route path="/chatting" element={<MainPage/>} />
            </Routes>
          </main>
          <ToastContainer />
        </div>
      </Router>
  );
}

export default App;
