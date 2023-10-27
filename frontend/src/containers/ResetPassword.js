import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password } from "../actions/auth";
import { Card, Input, Button, Link, Spacer } from "@nextui-org/react";
import "dracula-ui/styles/dracula-ui.css";
import { Text } from "dracula-ui";

const centerText = {
  textAlign: "center",
  marginBottom: "20px",
};

const ResetPassword = ({ reset_password }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    reset_password(email);
    setRequestSent(true);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (requestSent) {
      navigate("/");
    }
  }, [requestSent, navigate]);

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
        <h3 style={centerText}>Request Password Reset</h3>
        <Spacer y={2} />
        <form onSubmit={onSubmit}>
          <Input
            style={{ lineHeight: "1.5", padding: "10px 5px", height: "40px" }}
            type="email"
            label="Email"
            name="email"
            value={email}
            onChange={onChange}
          />
          <div style={centerText}>
            <Spacer y={3} />
            <Button color="primary" block type="submit">
              Reset Password
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default connect(null, { reset_password })(ResetPassword);
