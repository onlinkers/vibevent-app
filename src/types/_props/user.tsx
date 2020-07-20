import { Event } from "./event";
import { Image } from "./image";

export interface User {
    _id: string;
    role: User;
    firstName: string;
    lastName?: string;
    description?: string;
    username: string;
    email: string;
    profilePhoto?: Image;
    eventsInvolved?: Event[];
    eventsCreated?: Event[];
    eventsSaved?: Event[];
}