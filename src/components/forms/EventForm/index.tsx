import React, { useState, useEffect } from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  Skeleton,
} from "antd";

import "./index.css";
import { EventCategoriesPayload } from "types/store";

interface Props {
    mode: "CREATE" | "EDIT";
    loading: Boolean;
    onSubmit: Function;
    eventCategories: EventCategoriesPayload;
    initialValues?: any;
}

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const EventForm: React.FunctionComponent<Props> = (props) => {

  const { loading, onSubmit, eventCategories, initialValues } = props;
  const initialVenueCoordinates = (initialValues && initialValues.venueCoordinates) || null;

  const [form] = Form.useForm();
  const [loaded, setLoaded] = useState(false);
  const [venueCoordinates, setVenueCoordinates] = useState<number[] | null>(initialVenueCoordinates);

  const submitFormatter = (formValues) => {
    const { venue, startDate, endDate, ...rest } = formValues;

    onSubmit({
      // venue needs its own object (including the coordinates)
      venue: {
        name: venue,
        location: venueCoordinates
      },
      // Dates need to be in ISO form
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      ...rest
    });
      
  };

  useEffect(() => {
    if(!loading && !loaded) {
      // Initialize the geocoder in the form
      const geocoder = new MapboxGeocoder({
        accessToken: MAPBOX_TOKEN,
        types: "country,region,place,postcode,locality,neighborhood"
      });

      const element = document.querySelectorAll("#venue");
      if(element.length) {
        geocoder.addTo("#venue");
        setLoaded(true);
      }

      // Update state and the form values when geocoder is used
      geocoder.on("result", ({ result }) => {
        const { place_name: placeName, geometry } = result;
        setVenueCoordinates(geometry);
        form.setFieldsValue({ venue: placeName });
      });
    }
  }, [loading]); // eslint-disable-line

  return loading ? <Skeleton active /> : (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      size={"small"}
      initialValues={initialValues}
      onFinish={submitFormatter}
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

      <Form.Item
        name="startDate"
        label="Start Date"
        rules={[
          {
            required: true,
            message: "Enter a start date!",
          },
          {
            validator: (rule, value) => {
              if(value >= Date.now()) return Promise.resolve();
              return Promise.reject("Cannot set the event to start in the past!");
            }
          }
        ]}
      >
        <DatePicker showTime/>
      </Form.Item>

      <Form.Item
        name="endDate"
        label="End Date"
        rules={[
          {
            required: true,
            message: "Enter an end date!",
          },
          ({ getFieldValue }) => ({
            validator: (rule, value) => {
              if (!value || getFieldValue("startDate") <= value) return Promise.resolve();
              return Promise.reject("Event cannot end before it starts!");
            },
          }),
        ]}
      >
        <DatePicker showTime/>
      </Form.Item>

      <Form.Item
        name="venue"
        label="Event Venue"
        rules={[
          {
            required: true,
            message: "Enter an venue!",
          }
        ]}
      >
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

      <Form.Item name="categories" label="Categories">
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
    </Form>
  );
};

export default EventForm;
