import React from "react";
import { connect } from "react-redux";
import { Modal, Button, Form } from "antd";
import UserSearch from "components/shared/form/inputs/userSearch";
import userService from "services/userService";
import { User } from "types/props";

interface Props {
    isOpen: boolean
    handleOk: (any: any, any2: any) => void
    handleCancel: () => void
    eventHosts: User[]
    initialValues: string[]
    userId: string
}

const HostModal: React.FunctionComponent<Props> = (props) => {
  const {
    isOpen,
    handleOk,
    handleCancel,
    eventHosts,
    initialValues,
    userId
  } = props;

  const [form] = Form.useForm();

  const onSubmit = async (formValues) => {
    const { hosts } = formValues;
    // get the actual host objects
    const { data } = await userService.getUsersByIds({ ids: hosts });
    const hostObjects = Object.values(data);

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
  
  const onCancel = () => {
    // reset to initial
    handleCancel();
    form.resetFields();
  };

  return (
    <Form
      form={form}
      labelAlign="left"
      layout="horizontal"
      size={"small"}
      initialValues={{ hosts: initialValues }}
      onFinish={onSubmit}
    >

      <Modal
        visible={isOpen}
        title="Edit your Hosts"
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>Cancel</Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>Save Hosts</Button>,
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
          <UserSearch
            mode="multiple"
            className="host-select"
            initialUserOptions={eventHosts}
          />
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
