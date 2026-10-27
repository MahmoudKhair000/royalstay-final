import { Room } from './room';

export interface Hotel {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  rating: number | string;
  rooms: Room[];
  imagesurl: string[];
}

export type HotelProfileInput = Pick<
  Hotel,
  'name' | 'email' | 'phone' | 'city' | 'imagesurl'
>;
