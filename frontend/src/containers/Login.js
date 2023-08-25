import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { login } from "../actions/auth";
import "dracula-ui/styles/dracula-ui.css";
import { Card, Text, Input, Button, Anchor } from "dracula-ui";

const Login = ({ login, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  // if (isAuthenticated) is true redirect to home page
  const navigate = useNavigate();
  if (isAuthenticated) {
    navigate("/");
    return null;
  }

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
            Login
          </Button>
        </div>
      </Form>
      <div className="mt-3 text-center">
        <Anchor href="/signup" color="green" hoverColor="pink" mb="sm" size="sm">
          {" "}
          Don't have an account? Sign Up{" "}
        </Anchor>
      </div>
      <div className="mt-3 text-center">
        <Anchor href="/reset-password" color="green" hoverColor="pink" mb="sm" size="sm">
          {" "}
          Forgot password?{" "}
        </Anchor>
      </div>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
