import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
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
import { EventsPayload, EventCategoriesPayload } from "types/store";
// import eventService from "services/eventService";

interface Props {
  events: EventsPayload;
  eventCategories: EventCategoriesPayload;
  loading: boolean;
  errors: {
    events?: string
    eventCategories?: string,
  };
  userId: string;
}

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const EventEdit: React.FunctionComponent<Props> = (props) => {

  
  const { eventId } = useParams();
  const history = useHistory();

  const {
    events,
    eventCategories,
    loading,
    // errors,
    // userId
  } = props;

  const thisEvent = events[eventId];
  // TODO: Fallback if not found in redux
  console.log({ thisEvent });

  const initialValues = thisEvent ? {
    name: thisEvent.name,
    // startDate: new Date(thisEvent.startDate), TODO: need to use "momentjs"
    // endDate: new Date(thisEvent.endDate),
    price: thisEvent.price,
    description: thisEvent.description,
    categories: thisEvent.categories,
    ticketLink: thisEvent.links?.ticket,
    venue: thisEvent.venue.name, // TODO: convert to coordinates?
    coverPhoto: thisEvent.media?.coverPhoto?.baseSrc,
    tags: thisEvent.tags?.hostTags
  } : {};

  const [loaded, setLoaded] = useState(false);

  const submit = async (formValues) => {

    console.log({ formValues }, history);
    
    // await eventService.setEvent(payload);

    message.warn("Event edit not functional yet!");
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
        <h1>Edit your event!</h1>
        {loading ? <Skeleton active /> : (
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            size={"small"}
            onFinish={submit}
            initialValues={initialValues}
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
    events: eventData.events,
    eventCategories: eventData.eventCategories,
    loading: eventData.loading,
    errors: eventData.errors,
    userId: userData.user._id
  };
};

export default connect(mapStateToProps, null)(EventEdit);
