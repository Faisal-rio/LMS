// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Course from "./pages/Course";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Blog from "./pages/Blog";
import Carousel from "./components/Carousel"; // Import the Carousel component

const App = () => {
  return (
    <Router>
      <Navbar />
      <Header />
      <Routes>
        <Route path="/" element={<PageWithFooter Component={Home} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Adding Footer to the Course route */}
        <Route
          path="/course"
          element={<PageWithFooter Component={Course} />}
        />

        <Route path="/contactus" element={<ContactUs />} />

        {/* Adding Footer to the Blog route */}
        <Route
          path="/blog"
          element={<PageWithFooter Component={Blog} />}
        />
      </Routes>
    </Router>
  );
};

// A wrapper component to conditionally render Footer
const PageWithFooter = ({ Component }) => {
  return (
    <>
      {/* Include Carousel only on Home page */}
      {Component === Home && <Carousel />}
      <Component />
      <Footer />
    </>
  );
};

export default App;
