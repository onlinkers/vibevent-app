import React, { useState } from "react";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  Divider,
  Popconfirm
} from "antd";

import DynamicInput from "components/shared/form/inputs/dynamicInput";
import DynamicSelect from "components/shared/form/inputs/dynamicSelect";
import MarkdownEditor from "components/shared/form/inputs/markdownEditor";

import "./index.scss";
import { EventCategoriesPayload } from "types/store";

interface Props {
  mode: "CREATE" | "EDIT";
  onSubmit: Function;
  eventCategories: EventCategoriesPayload;
  initialValues?: any;
  onChange?: (fieldsChanged: any, allFields?:any) => void;
  onDelete?: () => void;
}

// const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const EventForm: React.FunctionComponent<Props> = (props) => {

  const { mode, onSubmit, eventCategories, initialValues, onChange = () => {}, onDelete = () => {} } = props;
  // const initialVenueCoordinates = (initialValues && initialValues.venueCoordinates) || null;

  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [loaded, setLoaded] = useState(false);
  // const [venueCoordinates, setVenueCoordinates] = useState<number[] | null>(initialVenueCoordinates);

  const submitFormatter = async (formValues) => {
    try {

      setIsSubmitting(true);
      await onSubmit(formValues);

    }
    finally {

      setIsSubmitting(false);

    }
  };

  // TODO: Geocoding
  // useEffect(() => {
  //   if(!loaded) {
  //     // Initialize the geocoder in the form
  //     const geocoder = new MapboxGeocoder({
  //       accessToken: MAPBOX_TOKEN,
  //       types: "country,region,place,postcode,locality,neighborhood"
  //     });

  //     const element = document.querySelectorAll("#venue");
  //     if(element.length) {
  //       geocoder.addTo("#venue");
  //       setLoaded(true);
  //     }

  //     // Update state and the form values when geocoder is used
  //     geocoder.on("result", ({ result }) => {
  //       const { place_name: placeName, geometry } = result;
  //       setVenueCoordinates(geometry);
  //       form.setFieldsValue({ venue: placeName });
  //     });
  //   }
  // }, []); // eslint-disable-line

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      labelAlign="left"
      layout="horizontal"
      size={"small"}
      initialValues={initialValues}
      onValuesChange={onChange}
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
        name="date"
        label="Date"
        rules={[
          {
            required: true,
            message: "Enter a start date!",
          },
          {
            validator: (rule, value) => {
              if(value[0] >= Date.now()) return Promise.resolve();
              return Promise.reject("Cannot set the event to start in the past!");
            }
          }
        ]}
      >
        <DatePicker.RangePicker showTime/>
      </Form.Item>

      <Form.Item
        name="venueName"
        label="Event Venue"
        rules={[
          {
            required: true,
            message: "Enter an venue!",
          }
        ]}
      >
        <Input />
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
        <MarkdownEditor />
      </Form.Item>

      <Divider orientation="left">Add Links</Divider>
      
      <DynamicInput type="links" inputs={[
        {
          name: "name",
          props: {
            style: { width: "30%" },
            rules: [
              {
                required: true,
                message: "Enter a link type!",
              }
            ]
          },
          render: <Input placeholder="Type"/>
        },
        {
          name: "link",
          props: {
            style: { width: "70%" },
            rules: [
              {
                required: true,
                message: "Enter a link!",
              },
              {
                type: "url",
                message: "This field must be a valid url."
              }
            ]
          },
          render: <Input placeholder="URL"/>
        }
      ]}/>

      <Divider orientation="left">Add Rooms</Divider>
      
      <DynamicInput type="room" inputs={[
        {
          name: "type",
          props: {
            style: { width: "30%" },
            rules: [
              {
                required: true,
                message: "Enter room type!",
              }
            ]
          },
          render: <DynamicSelect dropdownPlaceholder="Room type" initialOptions={["zoom"]} dynamic={false}/>
        },
        {
          name: "link",
          props: {
            style: { width: "30%" },
            rules: [
              {
                required: true,
                message: "Enter a room URL!",
              }
            ]
          },
          render: <Input placeholder="URL"/>
        },
        {
          name: "name",
          props: {
            style: { width: "30%" }
          },
          render: <Input placeholder="Room name"/>
        }
      ]}/>

      <Divider />

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

      {/* TODO: Common tags in the dropdown */}
      <Form.Item
        name="tags"
        label="Tags"
      >
        <Select mode="tags"/>
      </Form.Item>

      {/* <Divider orientation="left">Media</Divider> */}

      {/* <Form.Item name="media" label="Upload Media">
          <Upload />
        </Form.Item> */}

      <Divider/>

      <Button type="primary" htmlType="submit" disabled={isSubmitting}>
        {mode === "CREATE" ? "Create Event" : "Save Event"}
      </Button>

      {mode === "EDIT" &&
      <Popconfirm
        title="Are you sure delete this event? You cannot undo this action."
        onConfirm={onDelete}
        okText="Yes"
        cancelText="No"
      >
        <Button className="event-delete-button" danger>Delete Event</Button>
      </Popconfirm>}

      <Divider/>

    </Form>
  );
};

export default EventForm;
