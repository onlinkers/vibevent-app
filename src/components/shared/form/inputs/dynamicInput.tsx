import React from "react";

import { Form, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import "./index.css";

interface Props {
    type?: string;
    inputs: {
        name: string;
        props: any;
        render: React.ReactNode;
    }[];
}
const DynamicInput: React.FunctionComponent<Props> = (props) => {

  const {
    type = "field",
    inputs
  } = props;

  return (
    <Form.List name={type}>
      {(fields, { add, remove }) => (
        <>
          {fields.map((field) => (
            <div key={field.fieldKey} className="dynamic-input">
              {
                inputs.map((input, index) => (
                  <Form.Item key={"input" + field.name + index} name={[field.name, input.name]} {...input.props} >
                    {input.render}
                  </Form.Item>
                ))
              }
              <MinusCircleOutlined style={{ color: "red" }} onClick={() => remove(field.name)}/>
            </div>
          ))}
          <Button type="dashed" onClick={() => add()}><PlusOutlined /> Add {type}</Button>
        </>
      )}
    </Form.List>
  );
};

export default DynamicInput;
