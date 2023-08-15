import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import VarianceCalculator from './VarianceCalculator';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EditableTable from './EditableTable';

const Home2 = () => {
  const [selectedKey, setSelectedKey] = useState(null);

  const handleSelect = (eventKey) => {
    setSelectedKey(eventKey);
  };

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Nav variant="pills" fill={true} onSelect={handleSelect}>
            <Container>
              <Navbar.Brand href="#home">
                <img
                  alt=""
                  src="/Home2_Suites_by_Hilton_logo.svg"
                  width="80"
                  height="40"
                  className="d-inline-block align-top"
                />
                {' '}
              </Navbar.Brand>
            </Container>
            <Container>
              <Nav.Item class="text-nowrap">
                <Nav.Link eventKey="snackshelf">Snack Shelf</Nav.Link>
              </Nav.Item>
            </Container>
            <Container>
              <Nav.Item class="text-nowrap">
                <Nav.Link eventKey="beverage">Beverage Cooler</Nav.Link>
              </Nav.Item>
            </Container>
            <Container>
              <Nav.Item>
                <Nav.Link eventKey="freezer">Freezer</Nav.Link>
              </Nav.Item>
            </Container>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        <Row>
          {/* Conditionally render components based on selectedKey */}
          <Col>
            {selectedKey === "snackshelf" && <EditableTable selectedDatabase="snackshelfEndpoint" />}
            {selectedKey === "beverage" && <EditableTable selectedDatabase="beveragesEndpoint" />}
            {selectedKey === "freezer" && <EditableTable selectedDatabase="freezerEndpoint" />}
          </Col>
          <Col>
            {selectedKey === "snackshelf" && <VarianceCalculator section="snackshelf" />}
            {selectedKey === "beverage" && <VarianceCalculator section="beverage" />}
            {selectedKey === "freezer" && <VarianceCalculator section="freezer" />}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home2;
