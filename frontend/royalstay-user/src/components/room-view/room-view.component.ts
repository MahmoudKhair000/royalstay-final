import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-room-view',
  imports: [],
  templateUrl: './room-view.component.html',
  styleUrl: './room-view.component.css'
})
export class RoomViewComponent {
  rooms: any = []
  room: any = {}
  roomImages: any = []
  roomDesc:any 

  getRoom(hotelId: any, roomId: any) {
    this.http
      .post(`http://localhost:4000/room`, { hotelId: hotelId, roomId: roomId })
      .subscribe((result: any) => {
        this.room = result;
        this.roomImages = this.room.imagesurl;
        this.roomDesc = this.room.description
        console.log(this.room);
        console.log(this.roomImages);
      })
  }

  constructor(private http: HttpClient) {
    this.getRoom(sessionStorage.getItem("hotelId"), sessionStorage.getItem("roomId"))
  }

}
