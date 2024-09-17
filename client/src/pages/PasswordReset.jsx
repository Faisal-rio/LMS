import React, { useState } from 'react';
import axios from 'axios';
import './PasswordReset.css'; // Ensure you have the appropriate CSS

const PasswordReset = () => {
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP, Step 3: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (step, email, otp, newPassword) => {
    try {
      setLoading(true);
      let response;
      switch (step) {
        case 1:
          response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
          break;
        case 2:
          response = await axios.post('http://localhost:5000/api/auth/verify-otp', { otp, email });
          break;
        case 3:
          response = await axios.post('http://localhost:5000/api/auth/reset-password', { token: otp, newPassword });
          break;
        default:
          throw new Error('Invalid step');
      }

      if (response.status === 200) {
        return { success: true, message: response.data.message || 'Operation successful.' };
      } else {
        throw new Error(response.data.message || 'An error occurred.');
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      return { success: false, message: error.response ? error.response.data.message : error.message };
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const result = await handlePasswordReset(step, email, otp, newPassword);
    if (result.success) {
      setSuccessMessage(result.message);
      if (step < 3) setStep(step + 1);
      if (step === 1) setEmail("");
      if (step === 2) setOtp("");
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
                minLength="6"
              />
            </div>
          )}
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Processing..." : step === 1 ? "Send Reset Link" : step === 2 ? "Verify OTP" : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
