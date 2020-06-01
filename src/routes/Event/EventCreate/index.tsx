import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  Skeleton,
  message
} from "antd";
import ExploreBar from "components/layouts/exporeBar";

import "../index.css";
import { EventCategoriesPayload } from "types/store";
import eventService from "services/eventService";

interface Props {
  eventCategories: EventCategoriesPayload;
  loading: boolean;
  errors: {
    events?: string
    eventCategories?: string,
  };
  userId: string;
}

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const EventCreate: React.FunctionComponent<Props> = (props) => {

  const history = useHistory();

  const {
    eventCategories,
    loading,
    // errors,
    userId
  } = props;

  const [loaded, setLoaded] = useState(false);

  const submit = async (formValues) => {
    
    const {
      startDate: sd,
      endDate: ed,
      coverPhoto: coverPhotoUrl,
      ticketLink: ticketLinkUrl,
      ...values
    } = formValues;

    const startDate = sd.toISOString();
    const endDate = ed.toISOString();
    
    // TODO: proper location-getting
    // hardcoded longlat venue
    const TEMPLATE_VENUE = {
      "name": "HQ 1.0",
      "location": {
        "type": "Point",
        "coordinates": [-123.174100, 49.255580]
      }
    };

    // TODO: Image uploading
    const coverPhoto = {
      baseSrc: coverPhotoUrl,
      size: {
        width: 100,
        height: 100
      }
    };

    // We need a default "host"
    const hosts = [userId];

    // links
    const links = {
      ticket: ticketLinkUrl
    };

    await eventService.createEvent({
      ...values,
      hosts,
      startDate,
      endDate,
      venue: TEMPLATE_VENUE,
      links,
      coverPhoto
    });

    message.success("Event created!");

    history.goBack();
  };

  useEffect(() => {
    if(!loading && !loaded) {
      const geocoder = new MapboxGeocoder({
        accessToken: MAPBOX_TOKEN,
        types: "country,region,place,postcode,locality,neighborhood"
      });

      const element = document.querySelectorAll("#venue");
      if(element.length) {
        geocoder.addTo("#venue");
        setLoaded(true);
      }
    }
  }, [loading]); // eslint-disable-line

  return (
    <React.Fragment>
      <ExploreBar />
      <div className="Page--center Page--explore EventForm">
        <h1>Create Your Event!</h1>
        {loading ? <Skeleton active /> : (
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            size={"small"}
            onFinish={submit}
          >
            <Form.Item
              name="name"
              label="Event Name"
              rules={[
                {
                  required: true,
                  message: "Enter event name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/* TODO: date AND time */}
            <Form.Item
              name="startDate"
              label="Start Date"
              rules={[
                {
                  required: true,
                  message: "Enter a start date!",
                },
              ]}
            >
              <DatePicker/>
            </Form.Item>

            <Form.Item
              name="endDate"
              label="End Date"
              rules={[
                {
                  required: true,
                  message: "Enter an end date!",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item name="venue" label="Event Venue">
              <div />
            </Form.Item>

            <Form.Item
              name="price"
              label="Price"
            >
              <InputNumber min={0}/>
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
            >
              <Input />
            </Form.Item>

            <Form.Item name="categories" label="Select">
              <Select mode="multiple" className="category-select">
                {Object.keys(eventCategories).map((categoryKey) => (
                  <Select.Option
                    key={categoryKey}
                    value={categoryKey}
                    className="category-select-option"
                  >{eventCategories[categoryKey]}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="ticketLink" label="Ticket Link">
              <Input />
            </Form.Item>

            <Form.Item name="coverPhoto" label="Cover Photo">
              <Input />
            </Form.Item>
            {/* <Form.Item name="media" label="Upload Other Media">
          <Input />
        </Form.Item> */}

            {/* TODO: Common tags in the dropdown */}
            <Form.Item
              name="tags"
              label="Tags"
            >
              <Select mode="tags"/>
            </Form.Item>

            <Button type="primary" htmlType="submit">Submit</Button>
          </Form>)}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ eventData, userData }) => {
  return {
    eventCategories: eventData.eventCategories,
    loading: eventData.loading,
    errors: eventData.errors,
    userId: userData.user._id
  };
};

export default connect(mapStateToProps, null)(EventCreate);
