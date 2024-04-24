import React, { useEffect, useState } from 'react';
import axios from "axios";
import moment from 'moment';

const Report = () => {
    const [fuelQuotes, setFuelQuotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchQuotes = async () => {
            const historyUrl = 'http://localhost:4000/all-fuel-quote-history';
            try {
                const response = await axios.get(historyUrl, { withCredentials: true });
                console.log(response.data);
                setFuelQuotes(response.data || []);
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

    const filteredFuelQuotes = fuelQuotes.filter(quote => {
        return (
            quote.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
            quote.gallonsRequested.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
            (quote.address && quote.address.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (quote.city && quote.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (quote.state && quote.state.toLowerCase().includes(searchQuery.toLowerCase())) ||
            moment(quote.deliveryDate).format('YYYY-MM-DD').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (quote.suggestedPrice && quote.suggestedPrice.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
            (quote.totalPrice && quote.totalPrice.toString().toLowerCase().includes(searchQuery.toLowerCase()))
        );
    });

    return (
        <div>
            <h2>All User Fuel Quote History</h2>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '500px' }}
            />
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={{ ...thTdStyle, ...thStyle }}>User Email</th>
                        <th style={{ ...thTdStyle, ...thStyle }}>Gallons Requested</th>
                        <th style={{ ...thTdStyle, ...thStyle }}>Delivery Address</th>
                        <th style={{ ...thTdStyle, ...thStyle }}>Delivery City</th>
                        <th style={{ ...thTdStyle, ...thStyle }}>Delivery State</th>
                        <th style={{ ...thTdStyle, ...thStyle }}>Delivery Date</th>
                        <th style={{ ...thTdStyle, ...thStyle }}>Price / Gallon</th>
                        <th style={{ ...thTdStyle, ...thStyle }}>Total Amount Due</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFuelQuotes.map((quote, index) => (
                        <tr key={index}>
                        {quote.users.length > 0 && (
                            <td style={thTdStyle}>{quote.users[0].email}</td>
                        )}
                        {quote.users.length === 0 && (
                            <td style={thTdStyle}></td>
                        )}
                            <td style={thTdStyle}>{quote.gallonsRequested}</td>
                            <td style={thTdStyle}>{quote.address || "N/A"}</td>
                            <td style={thTdStyle}>{quote.city || "N/A"}</td>
                            <td style={thTdStyle}>{quote.state || "N/A"}</td>
                            <td style={thTdStyle}>{moment(quote.deliveryDate).format('YYYY-MM-DD') || "N/A"}</td>
                            <td style={thTdStyle}>${quote.suggestedPrice ? quote.suggestedPrice.toFixed(2) : "0.00"}</td>
                            <td style={thTdStyle}>${quote.totalPrice ? quote.totalPrice.toFixed(2) : "0.00"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Report;
