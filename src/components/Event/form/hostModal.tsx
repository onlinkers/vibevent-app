import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Select } from "antd";
import userService from "services/userService";
import popup from "popup";
import { User } from "types/props";

interface Props {
    isOpen: boolean
    handleOk: (any: any) => void
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

  const handleSubmit = async () => {
    const { hosts } = await form.validateFields();
    // get the actual host objects
    const hostObjects = hosts.map((hostId) => availableUsers[hostId]);
    handleOk(hostObjects);
  };

  return (
    <Form
      form={form}
      labelAlign="left"
      layout="horizontal"
      size={"small"}
      initialValues={{ hosts: initialValues }}
    >

      <Modal
        visible={isOpen}
        title="Edit your Hosts"
        footer={[
          <Button key="back" onClick={handleCancel}>Cancel</Button>,
          <Button key="submit" type="primary" loading={!usersLoaded} onClick={handleSubmit}>Save Hosts</Button>,
        ]}
      >
        <Form.Item
          name="hosts"
          className="host-select-item"
          rules={[
            {
              required: true,
              message: "Event must have at least one host!",
            },
            {
              validator: (rule, value) => {
                // confirm if the main user is being removed
                if(!value.includes(userId)) {
                  Modal.confirm({
                    title: "Are you sure you want to remove yourself as a host for this event?",
                    onCancel: () => {
                      const currentHosts = form.getFieldValue("hosts");
                      form.setFieldsValue({
                        hosts: [...currentHosts, userId]
                      });
                    },
                    onOk: () => {}
                  });
                }
                return Promise.resolve();
              }
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
              >{user.firstName + " " + user.lastName}</Select.Option>
            ))}
          </Select>
        </Form.Item>

      </Modal>
    </Form>
  );
};

export default HostModal;
