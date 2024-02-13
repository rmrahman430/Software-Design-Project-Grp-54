import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import About from './components/AboutSection';
import LoginScreen from './pages/login'; // Import your LoginScreen component
import FuelScreen from './pages/fuel';
import "./App.css";

const App = () => {
  return (

      <Router>

        <Header/>

        <Routes>
          <Route
            path = "/"
            element = {<About/>}
          />

          <Route
            path = "/login"
            element = {<LoginScreen />}
          />

          <Route
            path = "/fuel"
            element = {<FuelScreen />}
          />

        </Routes>

      </Router>


  );
};

export default App;
