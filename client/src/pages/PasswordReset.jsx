import React, { useState } from 'react';
import axios from 'axios';
import './PasswordReset.css'; // Ensure you have the appropriate CSS

const handlePasswordReset = async (step, email, otp, newPassword) => {
  try {
    if (step === 1) {
      // Step 1: Send email for password reset
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      console.log('Email sent to:', email);
      return { success: true, message: 'Email sent successfully. Please check your inbox.' };
    } else if (step === 2) {
      // Step 2: Verify OTP
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', { otp, email });
      console.log('OTP Verified:', otp);
      return { success: true, message: 'OTP verified successfully. You can now set a new password.' };
    } else if (step === 3) {
      // Step 3: Update the password
      await axios.post('http://localhost:5000/api/auth/reset-password', { token: otp, password: newPassword });
      console.log('Password Updated:', newPassword);
      return { success: true, message: 'Password updated successfully!' };
    }
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    
    // Default error message
    let errorMessage = 'An error occurred. Please try again.';

    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 400:
          errorMessage = data.message || 'Bad request. Please check your input.';
          break;
        case 401:
          errorMessage = data.message || 'Unauthorized. Please check your credentials.';
          break;
        case 404:
          errorMessage = data.message || 'Resource not found.';
          break;
        case 500:
          errorMessage = data.message || 'Internal server error. Please try again later.';
          break;
        default:
          errorMessage = data.message || 'An unexpected error occurred.';
      }
    }
    
    return { success: false, message: errorMessage };
  }
};

const PasswordReset = () => {
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP, Step 3: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form submission for each step
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setSuccessMessage(""); // Reset success message

    const result = await handlePasswordReset(step, email, otp, newPassword);
    
    if (result.success) {
      setSuccessMessage(result.message);
      if (step < 3) {
        setStep(step + 1); // Move to next step
      }
      
      if (step === 1) {
        setEmail(""); // Clear email input
      }
      if (step === 2) {
        setOtp(""); // Clear OTP input
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="password-reset-container">
      <div className="right-form">
        <h2>{step === 1 ? "Forgot Password" : "Reset Your Password"}</h2>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="mb-3">
              <label htmlFor="email">Enter your email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}
          {step === 2 && (
            <div className="mb-3">
              <label htmlFor="otp">OTP</label>
              <input
                type="text"
                id="otp"
                placeholder="Enter the OTP sent to your email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          )}
          {step === 3 && (
            <div className="mb-3">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
          )}
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <button type="submit" className="btn btn-primary">
            {step === 1 && "Send Reset Link"}
            {step === 2 && "Verify OTP"}
            {step === 3 && "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
