import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Course from "./pages/Course";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Header />
      <Routes>
        <Route path="/" element={<PageWithFooter Component={Home} />} />
        <Route path="/course" element={<PageWithFooter Component={Course} />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

// A wrapper component to conditionally render Footer
const PageWithFooter = ({ Component }) => {
  return (
    <>
      <Component />
      <Footer />
    </>
  );
};

export default App;
