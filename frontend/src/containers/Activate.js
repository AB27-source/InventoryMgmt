import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../actions/auth";
import "dracula-ui/styles/dracula-ui.css";
import { Card, Text, Button } from "dracula-ui"; // Import Button

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
          Verify your account
        </Text>
        <div className="text-center">
          <Button
            variant="ghost"
            color="green"
            onClick={verify_account}
            style={{ marginTop: "50px" }}
            type="button"
            width="1/2"
            mx="auto"
            display="block"
            my="sm"
          >
            Verify
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default connect(null, { verify })(Activate);
