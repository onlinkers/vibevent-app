import { Venue } from "./venue";
import { Image } from "./image";

export interface Event {
  _id: string;
  hosts: string[];
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
    roomId: number;
    name?: string;
  }]
}
