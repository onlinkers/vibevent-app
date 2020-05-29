import React, { useState, createRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import queryString from "query-string";

import { Form, Button } from "antd";
import { FormInstance } from "antd/lib/form";
import TextInput from "components/forms/inputs/textInput";

const ConfirmSignUp: React.FunctionComponent = () => {

  const history = useHistory();
  const location = useLocation();
  const { email: queryEmail } = queryString.parse(location.search);

  const formRef = createRef<FormInstance>();

  const [sent, hasSent] = useState(false);
  const [status, setStatus] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const confirm = async (formValues) => {
    try {
      const { code, email } = formValues;
      const username = queryEmail || email;

      if(!username) throw new Error("Could not find an email to authenticate!");
      if(!code) return null;
      setStatus("validating");

      await Auth.confirmSignUp(username, code);
      setStatus("success");

      history.push("/auth/login");

    } catch(err) {
      setErrMsg(err.message);
      setStatus("error");
    }
  };

  const resend = async () => {
    try {
      const fieldValues = formRef.current?.getFieldsValue();
      const username = queryEmail || (fieldValues && fieldValues.email);
      if(!username) throw new Error("Could not find an email to resend validation code to!");

      await Auth.resendSignUp(username);
      hasSent(true);
      setErrMsg("Validation code sent!");
      setStatus("warning");
    } catch(err) {
      setErrMsg(err.message);
      setStatus("error");
    }
  };

  return (
    <div className="Page--center">
      <Form
        ref={formRef}
        name="basic"
        className="AuthForm"
        size="large"
        layout="horizontal"
        onFinish={confirm}
      >

        <div className="topWrapper">
          <div className="header">
            <h1 className="title">Confirm</h1>
            {queryEmail && <h3 className="sub-title">{queryEmail}</h3>}
            <h4 className="description">Confirm your e-mail by entering the verification code sent to you!</h4>
          </div>
          <div className="content">
            {!queryEmail && <TextInput
              name="email"
              label="Email"
            />}
            <TextInput
              name="code"
              label="Verification Code"
              validateStatus={status}
              help={status === "error" || status === "warning" ? errMsg : ""}
            />
          </div>
        </div>

        <div className="footer">
          <Button type="primary" htmlType="submit">Confirm Email</Button>
          <Button type="link" onClick={resend} disabled={sent}>Re-send Code</Button>
        </div>
      </Form>
    </div>
  );
};

export default ConfirmSignUp;