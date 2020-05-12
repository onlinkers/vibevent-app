import { Event } from "types/props";

const SetGeneralEvents = "setGeneralEvents";
const SetLocalEvent = "setLocalEvent";

export interface EventList {
  events: Event[];
}

interface SetGeneralEventsAction {
  type: typeof SetGeneralEvents;
  // ... typechecks
}

interface SetLocalEventAction {
  type: typeof SetLocalEvent;
  // ... typechecks
}

export type EventActionTypes = SetGeneralEventsAction | SetLocalEventAction;
