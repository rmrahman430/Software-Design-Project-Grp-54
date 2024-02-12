import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginScreen from './pages/login'; // Import your LoginScreen component

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={LoginScreen} />
          {/* Add more routes for other pages as needed */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
