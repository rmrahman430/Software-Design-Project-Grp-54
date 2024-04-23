import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { calculatePrice } from './pricingModule'; 

const Fuel = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    gallonsRequested: '',
    deliveryDate: '',
    address: '',
    city: '', 
    state: '',
    hasHistory: false
  });
  const [quotes, setQuotes] = useState([]);

  const handleChange = (e) => {
    let { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      value = checked;
    }

    if (name === "gallonsRequested") {
      value = value.replace(/[^0-9]/g, '');
    }

    setFormState({ ...formState, [name]: value });
  };

  const getQuote = async () => {
    try {
      const { suggestedPricePerGallon, totalAmountDue } = calculatePrice(formState.gallonsRequested, formState.state, formState.hasHistory);

      setFormState({
        ...formState,
        suggestedPrice: suggestedPricePerGallon,
        totalPrice: totalAmountDue
      });
    } catch (error) {
      console.error('Error getting quote:', error);
    }
  };

  const submitQuote = async (e) => {
    e.preventDefault();

    try {
      const { suggestedPricePerGallon, totalAmountDue } = calculatePrice(formState.gallonsRequested, formState.state, formState.hasHistory);

      const submissionState = {
        ...formState,
        suggestedPrice: suggestedPricePerGallon,
        totalPrice: totalAmountDue
      };

      const response = await axios.post('http://localhost:4000/fuel-quote', submissionState, { withCredentials: true });
      console.log('Form submitted response:', response.data);
      navigate('/fuel-quote-history');
    } catch (error) {
      console.error('Error submitting fuel quote:', error);
    }
  };

  useEffect(() => {
    const fetchQuotes = async () => {
      const historyUrl = 'http://localhost:4000/fuel-quote-history'; 
      try {
        const response = await axios.get(historyUrl, { withCredentials: true });
        console.log("response: ", response.data);

        const hasHistory = response.data.length > 0;
        setFormState(prevState => ({ ...prevState, hasHistory }));

      } catch (error) {
        console.error('Error fetching fuel quote history:', error);
      }
    };
    fetchQuotes();
  }, []);

  const states = ["NY", "CA", "TX", "FL", "PA", "FL"];

  return (
    <div className="fuelPage">
      <h2>Fuel Quote Page</h2>
      <form>
        <div>
          <label>Gallons Requested:</label>
          <input
            type="text" // Change this to text to avoid default number input behavior
            name="gallonsRequested"
            value={formState.gallonsRequested}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Delivery Date:</label>
          <input
            type="date"
            name="deliveryDate"
            value={formState.deliveryDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Delivery Address:</label>
          <input
            type="text"
            name="address"
            value={formState.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Delivery City:</label>
          <input
            type="text"
            name="city"
            value={formState.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Delivery State:</label>
          <select
            type="text"
            name="state"
            value={formState.state}
            onChange={handleChange}
            required
          >
          <option value="">Choose...</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <button type="button" className="getQuoteBtn" onClick={getQuote}> Get Quote </button>
      </form>
      <div> 
        <label> Returning Customer Discount </label>
        <input
          type="checkbox"
          checked={formState.hasHistory}
          onChange={handleChange}
          readOnly
        />
      </div>
      <div>
          <label>Suggested Price / gallon:</label>
          <input
            type="text"
            value={`$${formState.suggestedPrice ? formState.suggestedPrice.toFixed(2) : ''}`}
            readOnly
          />
        </div>
        <div>
          <label>Total Amount Due:</label>
          <input
            type="text"
            value={`$${formState.totalPrice ? formState.totalPrice.toFixed(2) : ''}`}
            readOnly
          />
        </div>
        <button className="submitBtn" onClick={submitQuote}>Submit Quote</button>
    </div>
  );
};

export default Fuel;
