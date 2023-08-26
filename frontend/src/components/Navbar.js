import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { logout } from "../actions/auth";
import { connect } from "react-redux";
import "dracula-ui/styles/dracula-ui.css";
import { Text, Button } from "dracula-ui"; // Import Button

const Navigationbar = ({ logout, isAuthenticated }) => {
  const guestLinks = () => (
    <Fragment>
      <Nav.Link as={Link} to="/login">
      <Text color="white" size="md" align="center" mb="lg">
          Login
        </Text>
      </Nav.Link>
      <Nav.Link as={Link} to="/signup">
      <Text color="white" size="md" align="center" mb="lg">
          Register
        </Text>
      </Nav.Link>
    </Fragment>
  );

  const authLinks = () => (
    <Nav.Link href="#!" onClick={logout}>
      <Text color="white" size="lg" align="center" mb="lg">
        Logout
      </Text>
    </Nav.Link>
  );

  return (
    <Navbar style={{ backgroundColor: "#424459" }}>
      <Container>
        <Navbar.Brand as={Link} to="/home2">
          <img
            alt=""
            src="/home2_white_logo.png"
            width="80"
            height="40"
            className="d-inline-block align-top"
          />{" "}
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            <Text color="white" size="lg" align="center" mb="lg">
              Home
            </Text>
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          {isAuthenticated ? authLinks() : guestLinks()}
        </Nav>
      </Container>
    </Navbar>
  );
};

const mapState = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapState, { logout })(Navigationbar);
