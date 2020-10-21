import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Select } from "antd";
import userService from "services/userService";
import popup from "popup";
import { User } from "types/props";

interface Props {
    isOpen: boolean
    handleOk: (any: any, any2: any) => void
    handleCancel: (any: any) => void
    initialValues: string[]
    userId: string
}

const HostModal: React.FunctionComponent<Props> = (props) => {
  const {
    isOpen,
    handleOk,
    handleCancel,
    initialValues,
    userId
  } = props;

  const [form] = Form.useForm();
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [availableUsers, setAvailableUsers] = useState<{[key: string]: User}>({});

  const fetchUsers = async () => {
    try {
      setUsersLoaded(false);
      const { data } = await userService.getUsers({});
      setAvailableUsers(data);

    } catch(err) {
      popup.error("Error getting other users.");
    } finally {
      setUsersLoaded(true);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (formValues) => {
    const { hosts } = formValues;
    // get the actual host objects
    const hostObjects = hosts.map((hostId) => availableUsers[hostId]);

    // check if the current user is included in the host list
    if(!hosts.includes(userId)) {
      Modal.confirm({
        title: "You are not in the current list of hosts for this event. Are you sure you want continue? You will not be able to make edits to this event after.",
        onCancel: () => {},
        onOk: () => {
          handleOk(hosts, hostObjects);}
      });
    } else {
      handleOk(hosts, hostObjects);
    }
  };

  return (
    <Form
      form={form}
      labelAlign="left"
      layout="horizontal"
      size={"small"}
      initialValues={{ hosts: initialValues }}
      onFinish={handleSubmit}
    >

      <Modal
        visible={isOpen}
        title="Edit your Hosts"
        footer={[
          <Button key="back" onClick={handleCancel}>Cancel</Button>,
          <Button key="submit" type="primary" loading={!usersLoaded} onClick={() => form.submit()}>Save Hosts</Button>,
        ]}
      >
        <Form.Item
          name="hosts"
          className="host-select-item"
          rules={[
            {
              required: true,
              message: "Event must have at least one host!",
            }
          ]}
        >
          <Select
            mode="multiple"
            className="host-select"
          >
            {Object.values(availableUsers).map((user) => (
              <Select.Option
                key={user._id}
                value={user._id}
                className="host-select-option"
              >{user.firstName + " " + (user.lastName || "")}</Select.Option>
            ))}
          </Select>
        </Form.Item>

      </Modal>
    </Form>
  );
};


const mapStateToProps = ({ userData }) => {
  return {
    userId: userData.user._id
  };
};

export default connect(mapStateToProps)(HostModal);
