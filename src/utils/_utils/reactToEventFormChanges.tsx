import { Event } from "types/props";

/**
 * Utility function used to merge field changes to an actual event object
 * @param event - the original event
 * @param fieldChanges - ant field changes
 */
export const reactToEventFormChanges = (event: Event, fieldChanges: any[] = []) => {

  if(!fieldChanges.length) return event;
  const newEventObject = { ...event };

  fieldChanges.forEach((field) => {
    switch(field.name) {
      case "name":
        break;
      default:
          
        break;
    }
  });

  return newEventObject;
};