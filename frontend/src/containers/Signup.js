import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Row, Col, Form } from "react-bootstrap";
import { register } from "../actions/auth"; // Assuming you have a register action
import "dracula-ui/styles/dracula-ui.css";
import { Card, Text, Input, Button, Anchor } from "dracula-ui";

const Signup = ({ register }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "" // Added for password confirmation
  });

  const { email, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      register(email, password);
    } else {
      // Handle password mismatch (e.g., show an error message)
    }
  };

  return (
    <Card
      variant="normal"
      color="blackSecondary"
      p="lg"
      m="auto"
      mx="auto"
      my="auto"
      rounded="base"
      width="md"
      display="block"
    >
      <div className="mb-3 text-center">
        <Text color="white" size="lg" align="center" mb="lg">
          UB Inventory Management
        </Text>
      </div>
      <Form onSubmit={onSubmit}>
        <Input
          my="sm"
          color="white"
          variant="outline"
          placeholder="Email"
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          height="sm"
        />

        <Input
          my="sm"
          color="white"
          variant="outline"
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          height="sm"
        />

        <Input
          my="sm"
          color="white"
          variant="outline"
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChange}
          height="sm"
        />

        <div className="text-center">
          <Button
            variant="ghost"
            color="green"
            type="submit"
            width="1/2"
            mx="auto"
            display="block"
            my="sm"
          >
            Register
          </Button>
        </div>
      </Form>
      <div className="mt-3 text-center">
        <Anchor href="/login" color="green" hoverColor="pink" mb="sm" size="sm">
          Already have an account? Login
        </Anchor>
      </div>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  // is authenticated: state.auth.isAuthenticated,
});

export default connect(null, { register })(Signup);
