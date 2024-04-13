import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FuelQuoteHistory = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      const historyUrl = 'http://localhost:4000/fuel-quote-history'; 
      try {
        const response = await axios.get(historyUrl, { withCredentials: true });
        setQuotes(response.data || []);
      } catch (error) {
        console.error('Error fetching fuel quote history:', error);
      }
    };
    fetchQuotes();
  }, []);

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const thTdStyle = {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'left',
  };

  const thStyle = {
    backgroundColor: '#f2f2f2',
  };

  return (
    <div>
      <h2>Fuel Quote History</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...thTdStyle, ...thStyle }}>Gallons Requested</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Delivery Address</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Delivery Date</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Price / Gallon</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Total Amount Due</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote, index) => (
            <tr key={index}>
              <td style={thTdStyle}>{quote.gallonsRequested}</td>
              <td style={thTdStyle}>{quote.address || "N/A"}</td>
              <td style={thTdStyle}>{quote.deliveryDate || "N/A"}</td>
              <td style={thTdStyle}>${quote.suggestedPrice ? quote.suggestedPrice.toFixed(2) : "0.00"}</td>
              <td style={thTdStyle}>${quote.totalPrice ? quote.totalPrice.toFixed(2) : "0.00"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FuelQuoteHistory;
