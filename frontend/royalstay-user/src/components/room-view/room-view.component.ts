import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-room-view',
  imports: [CommonModule,RouterLink],
  templateUrl: './room-view.component.html',
  styleUrl: './room-view.component.css'
})
export class RoomViewComponent {
  ngOnInit() {
    window.scrollTo(0, 0);
  }
  
  rooms: any = [];
  room: any = {};
  roomImages: any = [];
  roomDesc: any;

  getRoom(hotelId: any, roomId: any) {
    this.http
      .post(`http://localhost:4000/room/id`, { hotelId: hotelId, roomId: roomId })
      .subscribe((result: any) => {
        this.room = result;
        this.roomImages = this.room.imagesurl;
        this.roomDesc = this.room.description
        console.log(this.room);
        console.log(this.roomImages);
      })
  }

  reserve(roomId: any) {
    localStorage.setItem("roomId", roomId)
  }

  constructor(private http: HttpClient) {
    this.getRoom(localStorage.getItem("hotelId"), localStorage.getItem("roomId"))
  }

}
