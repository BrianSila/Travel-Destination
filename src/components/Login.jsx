
import React, { useState } from 'react';
import './login.css';

function Login({ onLogin, onClose, onSwitchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/users?email=${email}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const users = await response.json();

      if (users.length === 0) {
        alert('Invalid email or password!');
        return;
      }

      const user = users[0];
      if (user.password === password) {
        onLogin(user); // Call onLogin prop to handle user data
        alert('Login successful!');
      } else {
        alert('Invalid email or password!');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      alert(`Login failed: ${error.message}`);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <button type="button" className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account?{' '}
          <a href="#" onClick={onSwitchToSignup}>
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;