import { Venue } from "./venue";
import { Image } from "./image";
import { User } from "./user";

export interface Event {
  _id: string;
  hosts: User[];
  name: string;
  startDate: Date;
  endDate: Date;
  venue: Venue;
  price?: number;
  description?: string;
  rating?: {
    sum: number;
    count: number;
  };
  categories: string[];
  links?: {
    ticket?: string;
    register?: string;
  };
  media?: {
    coverPhoto?: Image;
    hostPhotos?: Image[];
    userPhotos?: Image[];
  };
  tags?: {
    userTags: string[];
    hostTags: string[];
  };
  rooms?: [{
    roomId?: number;
    roomLink?: string;
    name?: string;
  }]
}
