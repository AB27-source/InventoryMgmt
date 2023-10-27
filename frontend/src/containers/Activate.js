import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../actions/auth";
import { Card, Button, Spacer } from "@nextui-org/react"; // Adjusted import for Next UI

const Activate = ({ verify }) => {
  const [verified, setVerified] = useState(false);
  const { uid, token } = useParams();

  const verify_account = (e) => {
    verify(uid, token);
    setVerified(true);
  };

  if (verified) {
    return <Navigate to="/login" replace />;
  }

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
        <h3 style={{ textAlign: "center" }}>
          Verify your account
        </h3>
        <Spacer y={3} />
        <Button
          color="primary"
          block
          onClick={verify_account}
          style={{ marginTop: "50px" }}
        >
          Verify
        </Button>
      </Card>
    </div>
  );
};

export default connect(null, { verify })(Activate);
