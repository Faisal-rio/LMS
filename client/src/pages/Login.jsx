import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Login.css'; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages

    try {
      const response = await axios.post('https://lms-last-backend.onrender.com/api/auth/login', {
        email,
        password
      });

      if (response.status === 200) {
        // Handle successful login, e.g., store the JWT in localStorage
        localStorage.setItem('token', response.data.token);
        setMessage('Login successful!');
        // Redirect to a different page or update UI
        // You can use `history.push` or `navigate` from react-router-dom if needed
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message); // Error message from backend
      } else {
        setMessage('Error logging in');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <h2 className="left-heading">HappyLearning</h2>
        <p className="institute-name">Get Codified with our New Features!</p>
        <div className="additional-content">
          <p>
            Welcome to HappyLearning, where innovation meets education. Explore
            our latest features and join a community of learners dedicated to
            achieving excellence.
          </p>
          <p>
            Discover new courses, track your progress, and enjoy personalized
            learning experiences tailored to your needs. Let us help you achieve
            your career goals!
          </p>
        </div>
      </div>
      <div className="right-form">
        <h2>Welcome to HappyLearning!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {message && <p className="message-text">{message}</p>}
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember Me
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </form>
        
        <div className="mt-3">
          <p>
            New on our platform? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
