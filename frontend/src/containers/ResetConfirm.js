import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm } from "../actions/auth";
import { Card, Input, Button, Spacer } from "@nextui-org/react";

const ResetPasswordConfirm = ({ reset_password_confirm }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });

  const { new_password, re_new_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { uid, token } = useParams();

  const onSubmit = async (e) => {
    e.preventDefault();
    reset_password_confirm(uid, token, new_password, re_new_password);
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
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
          Reset Your Password
        </h3>
        <form onSubmit={onSubmit}>
          <Input
            style={{ lineHeight: "1.5", padding: "10px 5px", height: "40px" }}
            type="password"
            label="New Password"
            name="new_password"
            value={new_password}
            onChange={onChange}
          />
          <Spacer y={1} />
          <Input
            style={{ lineHeight: "1.5", padding: "10px 5px", height: "40px" }}
            type="password"
            label="Confirm New Password"
            name="re_new_password"
            value={re_new_password}
            onChange={onChange}
          />
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button color="primary" block type="submit">
              Reset Password
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
