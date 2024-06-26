import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/login';
import Register from './pages/registration';
import ProfileManagement from './pages/profileManagement';
import ProfileUpdate from './pages/profileUpdate';
import FuelQuote from './pages/fuel';
import Report from './pages/report'
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
        <Route path="/" element={<Navigate replace to="/about-us" /> }/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfileManagement />} />
        <Route path="/updateprofile" element={<ProfileUpdate />} />
        <Route path="/fuel-quote" element={<FuelQuote />} />
        <Route path="/fuel-quote-history" element={<FuelQuoteHistory quotes={[]} />} />
        <Route path="/about-us" element={<AboutSection />} />
        <Route path="/report" element={<Report />} />

      </Routes>
    </Router>
  );
}

export default App;
