import React, { useState } from "react";
import { Form as AntForm, Button as AntButton, message } from "antd";

import "./index.css";

interface Props {
  children: JSX.Element | JSX.Element[];
  title: string;
  description?: string;
  submitText: string;
  extraButtons?: JSX.Element | JSX.Element[];
  onSubmit: Function;
  onFinish?: Function;
  onFail?: Function;
  [key: string]: any;
}

const Form: React.FunctionComponent<Props> = ({ children, ...props }) => {

  const {
    title,
    description,
    submitText,
    extraButtons,
    onSubmit,
    onFinish = () => {},
    onFail = () => {},
    ...rest
  } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (formValues) => {
    try {
      setIsSubmitting(true);
      const result = await onSubmit(formValues);
      setIsSubmitting(false);
      console.log({ result });
      onFinish(result);
    }
    catch(err) {
      setIsSubmitting(false);
      message.error(err.message);
      onFail(err);
    }
  };

  return (
    <AntForm
      onFinish={submit}
      {...rest}
    >
      <div className="topWrapper">
        <div className="header">
          <h1 className="title">{title}</h1>
          <h4 className="description">{description}</h4>
        </div>
        
        <div className="content">
          {children}
        </div>
      </div>

      <div className="footer">
        <AntButton
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
        >{submitText}</AntButton>
        {extraButtons}
      </div>
    </AntForm>
  );
};

export default Form;
// extra form components
export { default as TextInput } from "./inputs/textInput";