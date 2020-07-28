import React, { useState } from "react";
import { Select, Divider, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

let index = 0;

interface Props {
    dropdownPlaceholder?: string;
    initialOptions?: string[];
    dynamic?: Boolean;
    [key: string]: any;
}

const DynamicSelect: React.FunctionComponent<Props> = (props) => {

  const {
    dropdownPlaceholder = "Option",
    initialOptions = [],
    dynamic = true,
    ...rest
  } = props;

  const [options, setOptions] = useState(initialOptions);
  const [name, setName] = useState("");

  const handleNameChange = event => {

    setName(event.target.value);

  };

  const addOption = () => {

    setOptions([...options, name || `New option ${index++}`]);
    setName(""); // reset name

  };

  return (
    <Select
      placeholder={dropdownPlaceholder}
      dropdownMatchSelectWidth={false}
      dropdownRender={menu => (
        <>
          {menu}
          <Divider style={{ margin: "4px 0" }} />

          {dynamic &&
          <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
            <Input style={{ flex: "auto" }} value={name} onChange={handleNameChange} />
            <span style={{ flex: "none", padding: "8px", display: "block", cursor: "pointer" }} onClick={addOption}>
              <PlusOutlined /> Add option
            </span>
          </div>}

        </>
      )}
      {...rest}
    >
      {options.map(option => (
        <Select.Option key={option} value={option}>{option}</Select.Option>
      ))}
    </Select>
  );
};

export default DynamicSelect;