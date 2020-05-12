import { Event } from "types/props";
import { SetGeneralEvents, SetLocalEvent } from "constants/index";

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
