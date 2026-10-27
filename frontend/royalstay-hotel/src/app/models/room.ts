export interface Room {
  _id: string;
  roomType: string;
  class: 'Economy' | 'Standard' | 'Luxury' | 'Premium';
  price: number;
  count: number;
  description: string;
  imagesurl: string[];
  createdAt?: string;
}

export type RoomInput = Omit<Room, '_id' | 'createdAt'>;
