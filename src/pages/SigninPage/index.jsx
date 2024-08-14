import React from 'react';
import './styles.css';

function SignInPage() {
  return (
    <div className="Sign-up-page">
        <div className="sign-in-container">
            <h2>Sign In</h2>
            <form className="sign-in-form">
                <input type="email" placeholder="Email" name="email" required />
                <input type="password" placeholder="Password" name="password" required />
                <button type="submit" className="sign-up-button">Sign In</button>
            </form>
            <p className="sign-up-prompt">
                Already have an account? <a href="/signup">Sign up</a>
            </p>
        </div>
    </div>
  );
}

export default SignInPage;
