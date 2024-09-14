import React, { useState } from "react";
import "./PasswordReset.css";

const PasswordReset = () => {
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP, Step 3: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const sendEmail = async () => {
    try {
      // Simulate sending email for forgot password
      console.log("Email sent to:", email);
      setStep(2);
    } catch (err) {
      setError("Failed to send email. Please try again.");
    }
  };

  const verifyOtp = async () => {
    try {
      // Simulate OTP verification
      console.log("OTP Verified:", otp);
      setStep(3);
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    }
  };

  const updatePassword = async () => {
    try {
      // Simulate password update
      console.log("Password Updated:", newPassword);
      alert("Password successfully updated!");
      setStep(1); // Optionally reset the flow after success
    } catch (err) {
      setError("Failed to update password. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      await sendEmail();
    } else if (step === 2) {
      await verifyOtp();
    } else if (step === 3) {
      await updatePassword();
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
