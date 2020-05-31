import React from "react";
import { useParams } from "react-router-dom";

const EventEdit = () => {

  const { eventId } = useParams();

  // TODO: Get information about the single event

  return (
    <div>
            Editing event with id: {eventId}
    </div>
  );
};

export default EventEdit;
