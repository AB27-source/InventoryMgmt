import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import InputGroup from "react-bootstrap/InputGroup";
import Form from 'react-bootstrap/Form';


const SnackShelfStock = () => {
  const [items, setItems] = useState([]);
  const [selectedBox, setSelectedBox] = useState("snackshelf");

  useEffect(() => {
    handleClick(selectedBox);
  }, [selectedBox]);

  const handleClick = (eventKey) => {
    setSelectedBox(eventKey);
    axios
      .get(`http://localhost:8000/api/${eventKey}/`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const calculateTotalQuantity = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const handleQuantityChange = (id, newQuantity) => {
    // Find the item by its ID
    const itemToUpdate = items.find((item) => item.id === id);
    if (!itemToUpdate) return;

    // Converts newQuantity to a number and checks if it's negative
    newQuantity = Number(newQuantity);
    if (newQuantity < 0) return;

    // Optimistically update the UI first
    const originalItems = [...items];
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setItems(updatedItems);

    // Make an API call to update the quantity in the database
    axios
      .put(`http://localhost:8000/api/${selectedBox}/${id}/`, {
        name: itemToUpdate.name,
        type: itemToUpdate.type,
        quantity: newQuantity,
      })
      .catch((error) => {
        console.log(error);
        // If there's an error, revert the change in the state
        setItems(originalItems);
        // Notify the user about the error
        alert("Failed to update quantity. Please try again.");
      });
  };

  return (
    <div>
      {/* <Tabs
        defaultActiveKey="snackshelf"
        id="fill-tab-example"
        className="mb-3"
        fill
        onSelect={(k) => handleClick(k)}
      >
        <Tab eventKey="snackshelf" title="Snack Shelf" />
      </Tabs> */}
      <h3>Total Quantity: {calculateTotalQuantity()}</h3>
      {selectedBox && (
        <>
          {/* <h2>{selectedBox}</h2> */}
          <Table striped>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <InputGroup>
                      <Form.Control
                        type="number"
                        min="0"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      />
                    </InputGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default SnackShelfStock;
