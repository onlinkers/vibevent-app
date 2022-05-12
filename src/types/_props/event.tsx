import { Venue } from "./venue";
import { Image } from "./image";
import { User } from "./user";

export interface Event {
  _id: string;
  hosts: User[];
  name: string;
  startDate: Date|string;
  endDate: Date|string;
  venue: Venue;
  price?: number;
  description?: string;
  rating?: {
    sum: number;
    count: number;
  };
  categories: string[];
  links: Link[] | [];
  media?: {
    coverPhoto?: Image;
    hostPhotos?: Image[];
    userPhotos?: Image[];
  };
  tags?: {
    userTags: string[];
    hostTags: string[];
  };
  rooms?: Room[] | []
}

interface Link {
  name: string;
  url: string;
}

interface Room {
  type: string;
  name?: string;
  url: string;
}