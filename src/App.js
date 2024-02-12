import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './pages/login'; // Import your LoginScreen component

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact component={LoginScreen} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
