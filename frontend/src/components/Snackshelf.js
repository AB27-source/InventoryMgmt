import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SnackShelfPage = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    axios.get('http://localhost:8000/api/snackshelf/')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const filteredItems = filter === 'All' ? items : items.filter(item => item.type === filter);

  return (
    <div>
      <h1>Snack Shelf</h1>
      <label>
        Filter by type:
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="sundry">Sundry</option>
          <option value="warmfood">Warm Food</option>
          <option value="snack">Snacks</option>
          <option value="candy">Candy</option>
        </select>
      </label>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            {/* <th>Type</th> */}
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              {/* <td>{item.type}</td> */}
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SnackShelfPage;
