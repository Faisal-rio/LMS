import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import "./ContactUs.css"; // Ensure this file exists and is correctly styled

const ContactUs = () => {
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // Add a class to the body when this component mounts
    document.body.classList.add("contact-page");

    // Clean up the class when this component unmounts
    return () => {
      document.body.classList.remove("contact-page");
    };
  }, []);

  // Handle phone number changes
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Only set state if the input is a number or empty and within length limit
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhone(value);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Example form data you would send to backend
    const formData = {
      firstName,
      lastName,
      email,
      phone,
      message,
    };

    console.log("Form Submitted:", formData);
    // Perform an API request or another action with the form data

    // After submission, clear the form and set the submission state
    setFormSubmitted(true);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="contact-us-container">
      <div className="contact-details">
        <div className="contact-info address-info">
          <FontAwesomeIcon icon={faLocationDot} className="contact-icon" />
          <h4>Address</h4>
          <p>07 Floor 3th Vaniyambadi TamilNadu</p>
        </div>
        <div className="contact-info lets-talk-info">
          <FontAwesomeIcon icon={faPhone} className="contact-icon" />
          <h4>Let's Talk</h4>
          <p>
            <a href="tel:+81001238741">+91 81001238741</a>
          </p>
        </div>
        <div className="contact-info support-info">
          <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
          <h4>General Support</h4>
          {/* Update the email link to use the 'mailto:' protocol */}
          <p>
            <a href="mailto:faisal.sfzubaida@gmail.com?subject=Support Request&body=Hello, I have a question about...">
              contact@gmail.com
            </a>
          </p>
        </div>
      </div>

      <div className="contact-form">
        <h2>Send Us A Message</h2>
        {formSubmitted && (
          <p className="success-message">
            Thank you! Your message has been sent.
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Eg. example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              placeholder="Eg. +1 800 000000"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Write us a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
