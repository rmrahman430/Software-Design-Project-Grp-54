import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Fuel = () => {
  const navigate = useNavigate();
  // Initialize suggestedPrice with a placeholder value for demonstration
  const suggestedPrice = 2.5; // Placeholder price per gallon

  const [formState, setFormState] = useState({
    gallonsRequested: '',
    deliveryDate: '',
    totalAmountDue: 0, // Initially set to 0, will be calculated
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming you would calculate totalAmountDue here based on gallonsRequested and suggestedPrice
    const totalAmountDue = formState.gallonsRequested * suggestedPrice;
    setFormState({ ...formState, totalAmountDue });

    console.log('Form submitted with state:', formState);
    // Navigate to the Fuel Quote History page after setting the state
    // Use setTimeout to ensure state is updated before navigation
    setTimeout(() => navigate('/fuel-quote-history'), 0);
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="fuelPage">
      <h2>Fuel Quote Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Gallons Requested:</label>
          <input
            type="number"
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
            value={`$${suggestedPrice.toFixed(2)}`} // Display the placeholder suggested price
            readOnly
          />
        </div>
        <div>
          <label>Total Amount Due:</label>
          <input
            type="text"
            value={`$${formState.totalAmountDue.toFixed(2)}`} // Calculate and display total amount due
            readOnly
          />
        </div>
        <button type="submit" className="submitBtn">Submit Quote</button>
      </form>
    </div>
  );
};

export default Fuel;
