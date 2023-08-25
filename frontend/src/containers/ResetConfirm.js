import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm } from "../actions/auth";
import { Form } from "react-bootstrap";
import "dracula-ui/styles/dracula-ui.css";
import { Card, Text, Input, Button } from "dracula-ui";

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
    console.log(uid, token, new_password, re_new_password); // Log the values
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
        {/* You can uncomment and modify this text if needed */}
        {/* <Text color="white" size="lg" align="center" mb="lg">
          Reset Your Password
        </Text> */}
      </div>
      <Form onSubmit={onSubmit}>
        <Input
          my="sm"
          color="white"
          variant="outline"
          placeholder="New Password"
          type="password"
          name="new_password"
          value={new_password}
          onChange={onChange}
          height="sm"
        />
        <Input
          my="sm"
          color="white"
          variant="outline"
          placeholder="Confirm New Password"
          type="password"
          name="re_new_password"
          value={re_new_password}
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
            Reset Password
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
