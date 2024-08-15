import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signinUser } from '../../services/userService';
import './styles.css';

function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signinUser(formData);
      alert('Login successful');
      navigate('/chatting');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="Sign-up-page">
      <div className="sign-in-container">
        <h2>Sign In</h2>
        <form className="sign-in-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
          <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
          <button type="submit" className="sign-up-button">Sign In</button>
        </form>
        <p className="sign-up-prompt">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default SignInPage;
