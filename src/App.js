// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/login';
import Register from './pages/registration'; 
import ProfileManagement from './pages/profileManagement';
import FuelQuote from './pages/fuel';
import FuelQuoteHistory from './pages/fuelQuoteHistory';
import "./App.css";
import AboutSection from './components/AboutSection';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} /> {/* Set Login as the default route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile-management" element={<ProfileManagement />} />
        <Route path="/fuel-quote" element={<FuelQuote />} />
        <Route path="/fuel-quote-history" element={<FuelQuoteHistory quotes={[]} />} /> {/* Placeholder for quotes */}
        <Route path="/about-us" element={<AboutSection />} /> {/* Route for AboutSection */}

      </Routes>
    </Router>
  );
}

export default App;
