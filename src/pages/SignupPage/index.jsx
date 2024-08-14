import React from 'react';
import './styles.css';

function SignUpPage() {
  return (
    <div className="Sign-up-page">
        <div className="sign-up-container">
            <h2>Sign Up</h2>
            <form className="sign-up-form">
                <input type="text" placeholder="Name" name="name" required />
                <input type="text" placeholder="Surname" name="surname" required />
                <input type="email" placeholder="Email" name="email" required />
                <input type="password" placeholder="Password" name="password" required />
                <input type="password" placeholder="Confirm Password" name="confirmPassword" required />
                <button type="submit" className="sign-up-button">Sign Up</button>
                <button type="button" className="google-sign-up-button">Sign Up with Google</button>
            </form>
            <p className="login-prompt">
                Already have an account? <a href="/signin">Sign-in</a>
            </p>
        </div>
    </div>
  );
}

export default SignUpPage;
