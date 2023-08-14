import React, { useState, useEffect } from 'react';
import axios from "axios";

const serverUrl = "http://localhost:8000/api/freezer/"

const FreezerPage = () => {
  const [items, setItems] = useState([]);
  const [itemID, setItemID] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    axios
      .get(serverUrl)
      .then((response) => {setItems(response.data);})
      .catch((error) => console.log(error));
  }, []);




  return (
    <div>
      <h1>This is the Freezer Inventory page</h1>
      <input
      type="number"
      placeholder="Quantity Taken"
      value={stock}
      onChange={(e) => setStock(e.target.value)}
      />
    </div>
  );
};

export default FreezerPage;