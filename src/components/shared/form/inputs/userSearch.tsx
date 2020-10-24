import React, { useState } from "react";
import { Select, Spin } from "antd";
import userService from "services/userService";
import { User } from "types/props";

interface Props {
    mode: "multiple" | "tags";
    initialUserOptions?: User[];
    dynamic?: Boolean;
    [key: string]: any;
}

let fetchId = 0;

const UserSearch: React.FunctionComponent<Props> = (props) => {

  const {
    mode,
    initialUserOptions = [],
    ...rest
  } = props;

  const [options, setOptions] = useState<User[]>(initialUserOptions);
  const [isFetching, setisFetching] = useState(false);

  const fetchUsers = async value => {
    fetchId += 1;
    const currentFetchId = fetchId;
    setisFetching(true);
    setOptions([]);
    
    const { data } = await userService.getUsers({
      query: {
        withEvents: false,
        results: 10,
        name: value
      }
    });

    if(fetchId === currentFetchId) {
      setOptions(data);
      setisFetching(false);
    }
  };

  const handleChange = () => {
    setOptions([]);
    setisFetching(false);
  };

  return (
    <Select
      mode={mode}
      notFoundContent={isFetching ?
        <Spin size="small" />
        : null
      }
      filterOption={false}
      onSearch={fetchUsers}
      onChange={handleChange}
      {...rest}
    >
      {Object.values(options).map((user) => (
        <Select.Option
          key={user._id}
          value={user._id}
        >{user.firstName + " " + (user.lastName || "")}</Select.Option>
      ))}
    </Select>
  );
};

export default UserSearch;