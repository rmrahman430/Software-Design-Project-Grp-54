import React from 'react';

const FuelQuoteHistory = () => {
  const quotes = [
    { gallonsRequested: 0, deliveryAddress: "0", deliveryDate: "0", suggestedPrice: 0, totalAmountDue: 0 }
  ];

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
              <td style={thTdStyle}>{quote.deliveryAddress}</td>
              <td style={thTdStyle}>{quote.deliveryDate}</td>
              <td style={thTdStyle}>${quote.suggestedPrice.toFixed(2)}</td>
              <td style={thTdStyle}>${quote.totalAmountDue.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FuelQuoteHistory;
