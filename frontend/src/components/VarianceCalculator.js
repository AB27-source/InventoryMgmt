import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { calculateVariance } from "../utils";
import Button from "react-bootstrap/Button";


const VarianceCalculator = () => {
  const [entries, setEntries] = useState([]);
  const [currentData, setCurrentData] = useState({
    endCount: 0,
    sold: 0,
    added: 0,
    transferred: 0,
    prevSales: 0,
  });
  const[snackshelfItems, setSnackshelfItems] = useState([]);

  useEffect(() => {
    // Fetch all entries from the database
    axios
      .get("http://localhost:8000/api/variancecalculator/")
      .then((res) => {
        setEntries(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // Fetch all entries from the database
    axios
      .get("http://localhost:8000/api/snackshelf/")
      .then((res) => {
        setSnackshelfItems(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddData = (e) => {
    e.preventDefault();
    // Fetch the latest entry from the database
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    // Check if there's already an entry for today
    const existingEntryForToday = entries.find(entry => entry.date === today);
  
    if (existingEntryForToday) {
      alert("You've already added an entry for today!");
      return;
    }

    axios
      .get("http://localhost:8000/api/variancecalculator/")
      .then((response) => {
        const latestEntry = response.data[0]; // Assuming the API returns the entries in descending order of date

        let previous_day_end_count;

        // Check if it's the first entry of the month
        if (
          !latestEntry ||
          new Date(latestEntry.date).getMonth() !== new Date().getMonth()
        ) {
          previous_day_end_count = snackshelfItems.reduce(
            (acc, item) => acc + item.quantity,
            0
          );
        } else {
          previous_day_end_count = latestEntry.end_count;
        }
        

        // Prepare data to send to the backend
        const dataToSend = {
          previous_day_end_count,
          inventory_sold: currentData.sold,
          added_inventory: currentData.added,
          transferred_inventory: currentData.transferred,
          previous_day_sales: currentData.prevSales,
          end_count: currentData.endCount,
        };

        // Make a POST request to save the data
        axios
          .post("http://localhost:8000/api/variancecalculator/", dataToSend)
          .then((response) => {
            console.log("Data saved successfully:", response.data);
            // You can also update the frontend state here if needed
            // Update the frontend state to reflect the new entry
            setEntries(prevEntries => [response.data, ...prevEntries]);
          })
          .catch((error) => {
            console.error("Error saving data:", error);
            alert("Failed to save data. Please try again.");
          });
      });
  };

  return (
    <div>
      <h2>Variance Calculator</h2>

      <Form onSubmit={handleAddData}>
        <Form.Group>
          <Form.Label>Inventory Sold</Form.Label>
          <Form.Control
            type="number"
            value={currentData.sold}
            onChange={(e) =>
              setCurrentData({ ...currentData, sold: Number(e.target.value) })
            }
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Added to Inventory</Form.Label>
          <Form.Control
            type="number"
            value={currentData.added}
            onChange={(e) =>
              setCurrentData({ ...currentData, added: Number(e.target.value) })
            }
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Transferred Inventory</Form.Label>
          <Form.Control
            type="number"
            value={currentData.transferred}
            onChange={(e) =>
              setCurrentData({
                ...currentData,
                transferred: Number(e.target.value),
              })
            }
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Previous Day Sales</Form.Label>
          <Form.Control
            type="number"
            value={currentData.prevSales}
            onChange={(e) =>
              setCurrentData({
                ...currentData,
                prevSales: Number(e.target.value),
              })
            }
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>End Count for Today</Form.Label>
          <Form.Control
            type="number"
            value={currentData.endCount}
            onChange={(e) =>
              setCurrentData({
                ...currentData,
                endCount: Number(e.target.value),
              })
            }
          />
        </Form.Group>

        <Button variant="primary" type="submit">Add Data for Today</Button>
      </Form>

      {entries.length > 0 && (
        <Table striped>
          <thead>
            <tr>
              <th>Date</th>
              <th>Previous Day End Count</th>
              <th>Inventory Sold</th>
              <th>Added to Inventory</th>
              <th>Transferred Inventory</th>
              <th>Previous Day Sales</th>
              <th>End Count</th>
              <th>Book Count</th>
              <th>Variance</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index}>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td>{entry.previous_day_end_count}</td>
                <td>{entry.inventory_sold}</td>
                <td>{entry.added_inventory}</td>
                <td>{entry.transferred_inventory}</td>
                <td>{entry.previous_day_sales}</td>
                <td>{entry.end_count}</td>
                <td>{entry.book_count}</td>
                <td>{entry.variance}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default VarianceCalculator;
