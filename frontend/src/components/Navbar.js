import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { logout } from "../actions/auth";
import { connect } from "react-redux";

const Navigationbar = ({ logout, isAuthenticated }) => {
  const guestLinks = () => (
    <Fragment>
      <Nav.Link as={Link} to="/login">
        Login
      </Nav.Link>
      <Nav.Link as={Link} to="/signup">
        Register
      </Nav.Link>
    </Fragment>
  );

  const authLinks = () => (
    <Nav.Link href="#!" onClick={logout}>
      Logout
    </Nav.Link>
  );

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/home2">
          <img
            alt=""
            src="/Home2_Suites_by_Hilton_logo.svg"
            width="80"
            height="40"
            className="d-inline-block align-top"
          />{" "}
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          {isAuthenticated? authLinks() : guestLinks()}
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
