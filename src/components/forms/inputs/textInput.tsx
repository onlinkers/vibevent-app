import React, { useState } from "react";
import { Form as AntForm, Input as AntInput } from "antd";

import "./index.css";

interface WrapperProps {
    label: string;
    variant?: "Group"
        | "Password"
        | "Search"
        | "TextArea";
    [x: string]: any;
}

interface Props {
    label: string;
    variant: "Group"
        | "Password"
        | "Search"
        | "TextArea"
        | "";
    active: Boolean;
    setActive: Function;
    [x: string]: any;
}

const InputWrapper: React.FunctionComponent<WrapperProps> = (props) => {

  const { label, variant = "", ...rest } = props;
  const [active, setActive] = useState(false);

  return (
    <AntForm.Item className={active ? "formitem active" : "formitem"} {...rest}>
      <TextInput label={label} variant={variant} active={active} setActive={setActive}/>
    </AntForm.Item>
  );
};

const TextInput: React.FunctionComponent<Props> = (props) => {

  const { variant = "", label, value, onChange, active, setActive } = props;

  const [val, setVal] = useState<any>("");

  const onValChange = (e) => {
    const { value } = e.target;
    setVal(value);
    onChange(value);
  };

  const InputElement: any = variant ? AntInput[variant] : AntInput;

  return (
    <React.Fragment>
      <div className={active ? "placeholder--small active" : "placeholder--small"}>{label}</div>
      <InputElement
        value={value || val}
        onChange={onValChange}
        onFocus={() => { setActive(true);}}
        onBlur={() => { setActive(false);}}
        placeholder={!active ? label : ""}
      />
    </React.Fragment>
  );
};

export default InputWrapper;
