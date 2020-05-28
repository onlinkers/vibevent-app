import { Event } from "./event";
import { Image } from "./image";

export interface User {
    _id: string;
    firstName: string;
    lastName?: string;
    email: string;
    username: string;
    profilePhoto?: Image;
    eventsInvolved?: Event[];
    eventsCreated?: Event[];
}