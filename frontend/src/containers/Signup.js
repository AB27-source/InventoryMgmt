import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { signup } from "../actions/auth";
import "dracula-ui/styles/dracula-ui.css";
import { Card, Text, Input, Button, Anchor } from "dracula-ui";

const Signup = ({ signup, isAuthenticated }) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
  });

  const { name, email, password, re_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password === re_password) {
      signup(name, email, password, re_password);
      setAccountCreated(true);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
        navigate("/");
    } else if (accountCreated) {
        navigate("/login");
    }
  }, [isAuthenticated, accountCreated, navigate]);

  return (
    <Card
      variant="normal"
      color="blackSecondary"
      p="lg"
      m="auto"
      mx="auto"
      my="auto"
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
          placeholder="Name"
          type="text"
          name="name"
          value={name || ""}
          onChange={onChange}
          height="sm"
        />

        <Input
          my="sm"
          color="white"
          variant="outline"
          placeholder="Email"
          type="email"
          name="email"
          value={email || ""}
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
          value={password || ""}
          onChange={onChange}
          height="sm"
        />

        <Input
          my="sm"
          color="white"
          variant="outline"
          placeholder="Confirm Password"
          type="password"
          name="re_password"
          value={re_password || ""}
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
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Signup);
