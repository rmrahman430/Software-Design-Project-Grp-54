import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Fuel = () => {
  const navigate = useNavigate();
  const suggestedPrice = 2.5; // Placeholder price per gallon

  const [formState, setFormState] =  useState([]);

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Only allow numeric values for gallonsRequested
    if (name === "gallonsRequested") {
      value = value.replace(/[^0-9]/g, '');
    }

    setFormState({ ...formState, [name]: value });
  };

  const totalPrice = formState.gallonsRequested ? formState.gallonsRequested * suggestedPrice : 0;
  const submissionState = {
    ...formState, 
    suggestedPrice,
    totalPrice
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/fuel-quote', submissionState, { withCredentials: true });
      console.log('Form submitted response:', response.data);
      navigate('/fuel-quote-history');
    } catch (error) {
      console.error('Error submitting fuel quote:', error);
    }
  };

  return (
    <div className="fuelPage">
      <h2>Fuel Quote Page</h2>
      <form onSubmit={handleSubmit}>
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
          <label>Suggested Price / gallon:</label>
          <input
            type="text"
            name="suggestPrice"
            value={`$${suggestedPrice.toFixed(2)}`}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div>
          <label>Total Amount Due:</label>
          <input
            type="text"
            name="totalPrice"
            value={`$${totalPrice.toFixed(2)}`}
            onChange={handleChange}
            readOnly
          />
        </div>
        <button type="submit" className="submitBtn">Submit Quote</button>
      </form>
    </div>
  );
};

export default Fuel;
