// EditableTable.js
import React, { useState, useEffect, useContext } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import Dropdown from "react-bootstrap/Dropdown";
import ConfigContext from "../ConfigContext";
import axios from "axios";

const EditableTable = ({ selectedDatabase }) => {
  const config = useContext(ConfigContext);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default to 10 rows per page
  const [selectedItemType, setSelectedItemType] = useState(""); // For filtering by item type

  useEffect(() => {
    const endpoint = config[selectedDatabase];
    if (endpoint) {
      axios
        .get(endpoint)
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [selectedDatabase, config]);

  // Filter data based on selected item type (only for snackshelf database)
  const filteredData = selectedDatabase === "snackshelfEndpoint" && selectedItemType
    ? data.filter(item => item.type === selectedItemType)
    : data;

  // Calculate the number of pages
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Get the data for the current page
  const currentData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div>
      {selectedDatabase === "snackshelfEndpoint" && (
        <Dropdown onSelect={setSelectedItemType}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Filter by Item Type
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="">All</Dropdown.Item>
            <Dropdown.Item eventKey="snack">Snack</Dropdown.Item>
            <Dropdown.Item eventKey="candy">Candy</Dropdown.Item>
            <Dropdown.Item eventKey="sundry">Sundry</Dropdown.Item>
            <Dropdown.Item eventKey="warmfood">Warm Food</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>
                <Form.Control
                  type="number"
                  value={item.quantity}
                  onChange={(e) => {
                    const updatedData = [...data];
                    updatedData[(currentPage - 1) * rowsPerPage + index].quantity = e.target.value;
                    setData(updatedData);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.First onClick={() => setCurrentPage(1)} />
        <Pagination.Prev onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />
        {[...Array(totalPages)].map((_, idx) => (
          <Pagination.Item key={idx} active={idx + 1 === currentPage} onClick={() => setCurrentPage(idx + 1)}>
            {idx + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} />
        <Pagination.Last onClick={() => setCurrentPage(totalPages)} />
      </Pagination>
    </div>
  );
};

export default EditableTable;
