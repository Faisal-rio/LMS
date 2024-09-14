import React, { useState } from "react";
import "./SignUp.css"; // Import the new CSS file

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const checkEmailAvailability = async (email) => {
    try {
      const response = await fetch("/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setEmailError(""); // Clear the error if email is available
      } else {
        setEmailError(data.message); // Display error if email is taken
      }
    } catch (error) {
      setEmailError("Error checking email availability");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    checkEmailAvailability(e.target.value); // Check email availability when it changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Check if email has error before submitting
    if (emailError) {
      setGeneralError("Please fix the errors before submitting.");
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }), // Send user details as JSON
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful signup
        console.log("Signup successful");
        // You can redirect or show success message here
        // Example: window.location.href = '/login';
      } else {
        // Display error from response
        setGeneralError(data.message || "Failed to sign up. Please try again.");
      }
    } catch (err) {
      // Handle network or other errors
      setGeneralError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="signup-container">
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
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && <p className="error-text">{emailError}</p>}
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
          {generalError && <p className="error-text">{generalError}</p>}
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
        <div className="mt-3">
          <p>
            Already have an account? <a href="/login">Log In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
