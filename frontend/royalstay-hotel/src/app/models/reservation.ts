export interface Reservation {
  _id: string;
  user: string;
  userName: string;
  userMail: string;
  userPhone: string;
  userAge: string;
  hotel: string;
  hotelName: string;
  hotelMail: string;
  hotelPhone: string;
  room: string;
  roomType: string;
  roomClass?: string;
  roomPrice: number;
  days: string[];
  total: number;
  notes?: string;
}
