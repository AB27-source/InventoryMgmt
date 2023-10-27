import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import { Card, Input, Button, Link, Spacer } from "@nextui-org/react";
import "dracula-ui/styles/dracula-ui.css";
import { Text } from "dracula-ui";

const centerText = {
  textAlign: "center",
  marginBottom: "20px",
};

const Login = ({ login, isAuthenticated, loginError }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = React.useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isInvalid) {
      login(email, password);
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
            type="email"
            label="Email"
            name="email"
            value={email}
            onChange={onChange}
            isInvalid={isInvalid}
            color={isInvalid ? "danger" : "default"}
            errorMessage={isInvalid && "Please enter a valid email"}
          />
          <Spacer y={4} />
          <Input
            type="password"
            label="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
          <div style={centerText}>
            <Spacer y = {3} />
            {loginError && (
              <p style={{ color: "red" }}> {loginError} </p>

          )}
          </div>
          <Spacer y={3} />
          <div style={centerText}>
            <Button color="primary" block type="submit">
              Login
            </Button>
          </div>
        </form>
        <div style={centerText}>
          <Spacer y={3} />
          <Link
            color="primary"
            block
            href="/signup"
            style={{ marginBottom: "10px" }}
          >
            Don't have an account? Sign Up
          </Link>
          <Link color block href="/reset-password">
            Forgot password?
          </Link>
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loginError: state.auth.loginError,
});

export default connect(mapStateToProps, { login })(Login);
