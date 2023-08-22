import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { calculateBookCount, calculateVariance } from "../utils";
import 'dracula-ui/styles/dracula-ui.css'
import { Button } from 'dracula-ui'
import ConfigContext from "../ConfigContext";

const VarianceCalculator = ({ section }) => {
  const [entries, setEntries] = useState([]);
  const [currentData, setCurrentData] = useState({
    endCount: 0,
    sold: 0,
    added: 0,
    transferred: 0,
    prevSales: 0,
  });
  const [snackshelfItems, setSnackshelfItems] = useState([]);
  const [beverageItems, setBeverageItems] = useState([]);
  const [freezerItems, setFreezerItems] = useState([]);
  const config = useContext(ConfigContext);
  const filteredEntries = entries.filter(entry => entry.section === section);

  useEffect(() => {
    // Fetch all entries from the database
    axios
      .get(config.varianceCalculatorEndpoint)
      .then((res) => {
        setEntries(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // Fetch all entries from the snackshelf database
    axios
      .get(config.snackshelfEndpoint)
      .then((res) => {
        setSnackshelfItems(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // Fetch all entries from the beverage database
    axios
     .get(config.beveragesEndpoint)
     .then((res) => {
        setBeverageItems(res.data);
      })
     .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // Fetch all entries from the freezer database
    axios
    .get(config.freezerEndpoint)
    .then((res) => {
        setFreezerItems(res.data);
      })
    .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddData = (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];  // Format: YYYY-MM-DD
  
    const existingEntryForTodayAndSection = entries.find((entry) => entry.date === today && entry.section === section);
  
    if (existingEntryForTodayAndSection) {
        alert("You've already added an entry for today for this section!");
        return;
    }
  
    let previous_day_end_count;
  
    // Check if there are any existing entries for the selected section
    const latestEntry = entries.find(entry => entry.section === section);
  
    if (latestEntry) {
      // Use the "End Count" of the latest entry
      previous_day_end_count = latestEntry.end_count;
    } else {
      // Use the initial count from the respective database
      if (section === 'snackshelf') {
        previous_day_end_count = snackshelfItems.reduce((acc, item) => acc + item.quantity, 0);
      } else if (section === 'beverage') {
        previous_day_end_count = beverageItems.reduce((acc, item) => acc + item.quantity, 0);
      } else if (section === 'freezer') {
        previous_day_end_count = freezerItems.reduce((acc, item) => acc + item.quantity, 0);
      }
    }

    const bookCount = calculateBookCount(
      previous_day_end_count,
      currentData.added,
      currentData.transferred,
      currentData.prevSales
    );
    const variance = calculateVariance(currentData.endCount, bookCount);

    const dataToSend = {
      section: section,
      previous_day_end_count,
      added_inventory: currentData.added,
      transferred_inventory: currentData.transferred,
      previous_day_sales: currentData.prevSales,
      end_count: currentData.endCount,
      book_count: bookCount,
      variance: variance,
    };

    axios
      .post("http://localhost:8000/api/variancecalculator/", dataToSend)
      .then((response) => {
        console.log("Data saved successfully:", response.data);
        setEntries((prevEntries) => [response.data, ...prevEntries]);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        alert("Failed to save data. Please try again.");
      });
  };

  return (
    <div>
      <h2>Variance Calculator</h2>

      <Form onSubmit={handleAddData}>
        {/* <Form.Group>
          <Form.Label>Inventory Sold</Form.Label>
          <Form.Control
            type="number"
            value={currentData.sold}
            onChange={(e) =>
              setCurrentData({ ...currentData, sold: Number(e.target.value) })
            }
          />
        </Form.Group> */}

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

        {/* <Form.Group>
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
        </Form.Group> */}

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

        <Button color="red" m="sm" type="submit">
          Add Data for Today
        </Button>
      </Form>
      
      {entries.length > 0 && (
        <Table striped>
          <thead>
            <tr>
              <th>Date</th>
              <th>Previous Day End Count</th>
              <th>Added to Inventory</th>
              <th>Previous Day Sales</th>
              <th>End Count</th>
              <th>Book Count</th>
              <th>Variance</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((entry, index) => (
              <tr key={index}>
                <td>{new Date(entry.date + 'T00:00:00').toLocaleDateString()}</td>
                <td>{entry.previous_day_end_count}</td>
                <td>{entry.added_inventory}</td>
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
