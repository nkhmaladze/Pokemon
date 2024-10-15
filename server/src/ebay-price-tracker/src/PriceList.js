import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PriceList() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    // Fetch prices from the backend
    axios.get('http://localhost:5000/getPrices')
      .then(response => {
        setPrices(response.data);
      })
      .catch(error => {
        console.error('Error fetching prices:', error);
      });
  }, []);

  return (
    <div>
      <h2>Price List</h2>
      <ul>
        {prices.map(price => (
          <li key={price.id}>{price.name}: ${price.amount}</li>
        ))}
      </ul>
    </div>
  );
}

export default PriceList;
