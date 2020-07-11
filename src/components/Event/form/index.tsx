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
} from "antd";

import DynamicInput from "components/shared/form/inputs/dynamicInput";
import DynamicSelect from "components/shared/form/inputs/dynamicSelect";

import "./index.scss";
import { EventCategoriesPayload } from "types/store";

interface Props {
    mode: "CREATE" | "EDIT";
    onSubmit: Function;
    eventCategories: EventCategoriesPayload;
    initialValues?: any;
}

// const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const EventForm: React.FunctionComponent<Props> = (props) => {

  const { onSubmit, eventCategories, initialValues } = props;
  // const initialVenueCoordinates = (initialValues && initialValues.venueCoordinates) || null;

  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [loaded, setLoaded] = useState(false);
  // const [venueCoordinates, setVenueCoordinates] = useState<number[] | null>(initialVenueCoordinates);

  const submitFormatter = async (formValues) => {

    setIsSubmitting(true);

    const { venue, date, link, ...rest } = formValues;

    // links need to be re-organized
    const links = {};
    link.forEach((l) => {
      links[l.type] = l.url;
    });

    await onSubmit({
      // venue needs its own object (including the coordinates)
      venue: {
        name: venue,
      },
      // Dates need to be in ISO form
      startDate: date[0].toISOString(),
      endDate: date[1].toISOString(),
      links,
      ...rest
    });

    setIsSubmitting(false);
      
  };

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
      labelCol={{ span: 4 }}
      labelAlign="left"
      layout="horizontal"
      size={"small"}
      initialValues={initialValues}
      onFinish={submitFormatter}
    >

      <Divider />
    
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
        name="venue"
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
        <Input />
      </Form.Item>

      <Divider orientation="left">Add Links</Divider>
      
      <DynamicInput type="link" inputs={[
        {
          name: "type",
          props: {
            style: { width: "30%" },
            rules: [
              {
                required: true,
                message: "Enter a link type!",
              }
            ]
          },
          render: <DynamicSelect dropdownPlaceholder="Link type" initialOptions={["register", "ticket"]} dynamic={false}/>
        },
        {
          name: "url",
          props: {
            style: { width: "70%" },
            rules: [
              {
                required: true,
                message: "Enter a url!",
              },
              {
                type: "url",
                message: "This field must be a valid url."
              }
            ]
          },
          render: <Input/>
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

      <Button type="primary" htmlType="submit" disabled={isSubmitting}>Submit</Button>
    </Form>
  );
};

export default EventForm;
