import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Fuel = () => {
  const navigate = useNavigate();
  const suggestedPrice = 2.5; // Placeholder price per gallon

  const [formState, setFormState] = useState({
    gallonsRequested: '',
    deliveryDate: '',
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Only allow numeric values for gallonsRequested
    if (name === "gallonsRequested") {
      value = value.replace(/[^0-9]/g, '');
    }

    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalAmountDue = formState.gallonsRequested * suggestedPrice;
    const submissionState = { ...formState, totalAmountDue };

    try {
      const response = await axios.post('http://localhost:4000/fuel-quote', submissionState, { withCredentials: true });
      console.log('Form submitted response:', response.data);
      navigate('/fuel-quote-history');
    } catch (error) {
      console.error('Error submitting fuel quote:', error);
    }
  };

  // Calculate totalAmountDue for displaying in the input field
  const totalAmountDue = formState.gallonsRequested ? formState.gallonsRequested * suggestedPrice : 0;

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
          <label>Suggested Price / gallon:</label>
          <input
            type="text"
            value={`$${suggestedPrice.toFixed(2)}`}
            readOnly
          />
        </div>
        <div>
          <label>Total Amount Due:</label>
          <input
            type="text"
            value={`$${totalAmountDue.toFixed(2)}`}
            readOnly
          />
        </div>
        <button type="submit" className="submitBtn">Submit Quote</button>
      </form>
    </div>
  );
};

export default Fuel;
