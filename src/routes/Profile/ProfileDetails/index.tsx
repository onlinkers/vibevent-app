import React, { useState } from "react";

import { Button, Typography, Collapse, Empty } from "antd";
import EventCard from "components/cards/largeCard/eventCard";

import { User } from "types/props";

import "./index.css";
import DefaultAvatar from "assets/media/default-avatar.png";

interface Props {
  user: User;
  onSave: Function;
  redirectEvents: Function;
  logOut: Function;
}

// TODO: Import color from styles
const saveColor = { background: "green", color: "white" };
const errorColor = { background: "red", color: "white" };

const ProfileDetails = (props: Props) => {
  const { user, onSave, redirectEvents, logOut } = props;

  // editable states
  const { profilePhoto, eventsCreated, eventsInvolved } = user;

  const imageSrc = profilePhoto?.baseSrc || DefaultAvatar;

  const [editable, setEditable] = useState(false);
  // original input states
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [description, setDescription] = useState(user.description);

  const { _id: userId } = user;

  const save = async () => {
    // need to turn into an array of strings first
    const eventsInvolvedIds = eventsInvolved?.map((event) => event._id);
    const eventsCreatedIds = eventsCreated?.map((event) => event._id);

    await onSave({
      id: userId,
      payload: {
        username,
        email,
        firstName,
        lastName,
        description,
        profilePhoto,
        eventsInvolved: eventsInvolvedIds,
        eventsCreated: eventsCreatedIds,
      },
    });
    setEditable(false);
  };

  const cancel = () => {
    setUsername(user.username);
    setEmail(user.email);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setDescription(user.description);
    setEditable(false);
  };

  return (
    <div className="Profile row">
      {/* TODO: Profile picture uploading */}
      <div className="col-2 user-profile">
        <img className="user-profile__image" src={imageSrc} alt="profile" />
        <Typography.Title className="user-profile__name">
          {firstName} {lastName}
        </Typography.Title>
        <Button
          className="button--clickable"
          type="primary"
          onClick={() => setEditable(!editable)}
          disabled={editable}
        >
          Edit Profile
        </Button>
        <Button className="button--clickable" onClick={() => logOut()}>
          Log Out
        </Button>
      </div>
      <div className="col-2 user-data">
        <h3>
          <span className="label">First Name:</span>
          <Typography.Text
            className={editable ? "editable--active" : "editable"}
            editable={
              editable ? { editing: true, onChange: setFirstName } : false
            }
          >
            {firstName}
          </Typography.Text>
        </h3>
        <h3>
          <span className="label">Last Name:</span>
          <Typography.Text
            className={editable ? "editable--active" : "editable"}
            editable={
              editable ? { editing: true, onChange: setLastName } : false
            }
          >
            {lastName}
          </Typography.Text>
        </h3>
        <h3>
          <span className="label">Username:</span>
          <Typography.Text
            className={editable ? "editable--active" : "editable"}
            editable={
              editable ? { editing: true, onChange: setUsername } : false
            }
          >
            {username}
          </Typography.Text>
        </h3>
        <h3>
          <span className="label">Email:</span>
          <Typography.Text
            className={editable ? "editable--active" : "editable"}
            editable={editable ? { editing: true, onChange: setEmail } : false}
          >
            {email}
          </Typography.Text>
        </h3>
        <h3>
          <span className="label">Description:</span>
          <Typography.Text
            className={editable ? "editable--active" : "editable"}
            editable={
              editable ? { editing: true, onChange: setDescription } : false
            }
          >
            {description}
          </Typography.Text>
        </h3>
        {editable && (
          <div className="edit-buttons">
            <Button
              className="button--clickable"
              type="primary"
              style={saveColor}
              onClick={save}
            >
              Save
            </Button>
            <Button
              className="button--clickable"
              type="primary"
              style={errorColor}
              onClick={cancel}
            >
              Cancel
            </Button>
          </div>
        )}
        <br />
        <Collapse defaultActiveKey={[]} className="events-panel">
          <Collapse.Panel header="Events You've Created:" key="created">
            {eventsCreated &&
              eventsCreated.map((event) => (
                <EventCard
                  key={event._id}
                  variant="brief"
                  event={event}
                  width="10em"
                  size="small"
                  bordered
                />
              ))}
            {(!eventsCreated || !eventsCreated.length) && (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>
                <Button type="primary" onClick={() => redirectEvents()}>
                  Find Events!
                </Button>
              </Empty>
            )}
          </Collapse.Panel>
        </Collapse>
        <Collapse defaultActiveKey={[]} className="events-panel">
          <Collapse.Panel
            header="Events You've Been Involved With:"
            key="created"
          >
            {eventsInvolved &&
              eventsInvolved.map((event) => (
                <EventCard
                  key={event._id}
                  variant="brief"
                  event={event}
                  width="10em"
                  size="small"
                  bordered
                />
              ))}
            {(!eventsInvolved || !eventsInvolved.length) && (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>
                <Button type="primary" onClick={() => redirectEvents()}>
                  Find Events!
                </Button>
              </Empty>
            )}
          </Collapse.Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default ProfileDetails;
