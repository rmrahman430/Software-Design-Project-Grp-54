import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/login';
import Register from './pages/registration';
import ProfileManagement from './pages/profileManagement';
import FuelQuote from './pages/fuel';
import FuelQuoteHistory from './pages/fuelQuoteHistory';
import AboutSection from './components/AboutSection';
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (

    <Router>
      <Header />
      <div>
      </div>
      <Routes>
        {/* Existing routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfileManagement />} />
        <Route path="/fuel-quote" element={<FuelQuote />} />
        <Route path="/fuel-quote-history" element={<FuelQuoteHistory quotes={[]} />} />
        <Route path="/about-us" element={<AboutSection />} />

      </Routes>
    </Router>
  );
}

export default App;
