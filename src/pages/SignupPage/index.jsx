import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../../services/userService';
import './styles.css';
import { useUserContext } from '../../contexts/userContext';
import { toast } from 'react-toastify';

function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      const { name, surname, email, password } = formData;
      const userData = { firstName: name, lastName: surname, email, password };
      const response = await signupUser(userData);

      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);

      console.log(response.user);

      navigate('/chatting');
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  return (
    <div className="sign-up-page">
      <div className="sign-up-container">
        <h2>Sign Up</h2>
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit" className="sign-up-button">Sign Up</button>
          <button type="button" className="google-sign-up-button">
            Sign Up with Google
          </button>
        </form>
        <p className="login-prompt">
          Already have an account? <a href="/signin">Sign-in</a>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
