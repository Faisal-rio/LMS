import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Send a POST request to the login API with email and password
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password as JSON
      });

      const data = await response.json(); // Parse the JSON response

      if (response.ok) {
        // If login is successful
        console.log('Login successful');
        // Redirect user or store token/session details as necessary
        // Example: localStorage.setItem('token', data.token);
      } else {
        // If login fails, set the error message
        setError(data.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      // Catch any network errors
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <h2 className="left-heading">HappyLearning</h2>
        <p className="institute-name">Get Codified with our New Features!</p>
        <div className="additional-content">
          <p>
            Welcome to HappyLearning, where innovation meets education. Explore our latest features and join a community of learners dedicated to achieving excellence.
          </p>
          <p>
            Discover new courses, track your progress, and enjoy personalized learning experiences tailored to your needs. Let us help you achieve your career goals!
          </p>
        </div>
      </div>
      <div className="right-form">
        <h2>Welcome to HappyLearning!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">Email or Username</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email or username"
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
          {error && <p className="error-message">{error}</p>}
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
          </div>
          <button type="submit" className="btn btn-primary">Log In</button>
        </form>
        <div className="mt-3">
          {/* Use Link for navigation to avoid full page reloads */}
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <div className="mt-3">
          <p>New on our platform? <Link to="/signup">Create an account</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
