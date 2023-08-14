import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SnackShelfStock from './SnackshelfStock';
import VarianceCalculator from './VarianceCalculator';
import Container from'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home2 = () => {
  const [selectedKey, setSelectedKey] = useState(null);

  const handleSelect = (eventKey) => {
    setSelectedKey(eventKey);
  };

  return (
    <>
    <Navbar className="bg-body-tertiary">
      <Container>
        <Nav variant="pills" onSelect={handleSelect}>
        <Container>
        <Navbar.Brand href="#home">
          <img
          alt =""
          src="/Home2_Suites_by_Hilton_logo.svg"
          width="80"
          height="40"
          className="d-inline-block align-top"
          />{' '}
        </Navbar.Brand>
      </Container>
          <Nav.Item>
            <Container>
              <NavDropdown title="SnackShelf" id="nav-dropdown">
                <NavDropdown.Item eventKey="1.1">Calculate Variance</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="1.2">Edit Stock</NavDropdown.Item>
              </NavDropdown>
            </Container>
          </Nav.Item>
          <Nav.Item>
            <Container>
              <NavDropdown title="Beverage Cooler" id="nav-dropdown">
                <NavDropdown.Item eventKey="2.1">Calculate Variance</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="2.2">Edit Stock</NavDropdown.Item>
              </NavDropdown>
            </Container>
          </Nav.Item>
          <Nav.Item>
            <Container>
              <NavDropdown title="Freezer" id="nav-dropdown">
                <NavDropdown.Item eventKey="3.1">Calculate Variance</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="3.2">Edit Stock</NavDropdown.Item>
              </NavDropdown>
            </Container>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
      
      <Container>
        <Row>
          {/* Conditionally render SnackShelfStock based on selectedKey */}
          <Col>
            {selectedKey === "1.2" && <SnackShelfStock />}
          </Col>
          <Col>
            {selectedKey === "1.2" && <VarianceCalculator />}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home2;
