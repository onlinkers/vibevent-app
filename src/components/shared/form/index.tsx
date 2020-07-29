import React, { useState } from "react";
import { Form as AntForm, Button as AntButton } from "antd";

import popup from "popup";
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
  const [formInstance] = AntForm.useForm();

  const validate = (validations) => {
    const errorFields = validations.errorFields.map((value) => value.name);
    // antd needs to be fixed for nested items
    // const firstError = errorFields[0];
    // formInstance.scrollToField(firstError);
    popup.error(`Error validating the following fields: ${errorFields.join(", ")}`);
  };

  const submit = async (formValues) => {
    try {
      setIsSubmitting(true);
      const result = await onSubmit(formValues);
      setIsSubmitting(false);
      onFinish(result);
    }
    catch(err) {
      setIsSubmitting(false);
      popup.error(err.message);
      onFail(err);
    }
  };

  return (
    <AntForm
      form={formInstance}
      onFinish={submit}
      onFinishFailed={validate}
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