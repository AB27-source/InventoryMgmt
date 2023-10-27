import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../actions/auth";
import { Card, Input, Button, Link, Spacer } from "@nextui-org/react";
import "dracula-ui/styles/dracula-ui.css";
import { Text } from "dracula-ui";

const centerText = {
  textAlign: "center",
  marginBottom: "20px",
};

const Signup = ({ signup, isAuthenticated }) => {
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
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card shadow style={{ maxWidth: "400px", padding: "40px", width: "90%" }}>
        <h3>UB Inventory Management</h3>
        <Spacer y={2} />
        <form onSubmit={onSubmit}>
          <Input
            style={{ lineHeight: "1.5", padding: "10px 5px", height: "40px" }}
            type="text"
            label="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
          <Spacer y={2} />
          <Input
            style={{ lineHeight: "1.5", padding: "10px 5px", height: "40px" }}
            type="email"
            label="Email"
            name="email"
            value={email}
            onChange={onChange}
          />
          <Spacer y={2} />
          <Input
            style={{ lineHeight: "1.5", padding: "10px 5px", height: "40px" }}
            type="password"
            label="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
          <Spacer y={2} />
          <Input
            style={{ lineHeight: "1.5", padding: "10px 5px", height: "40px" }}
            type="password"
            label="Confirm Password"
            name="re_password"
            value={re_password}
            onChange={onChange}
          />
          <Spacer y={3} />
          <div style={centerText}>
            <Button color="primary" block type="submit">
              Register
            </Button>
          </div>
        </form>
        <div style={centerText}>
          <Spacer y={3} />
          <Link
            color="primary"
            block
            href="/login"
            style={{ marginBottom: "10px" }}
          >
            Already have an account? Login
          </Link>
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Signup);
