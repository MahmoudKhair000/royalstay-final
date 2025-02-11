import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-rooms',
  imports: [RouterLink],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {
  rooms: any = {};
  goToRoom(roomId: any) {
    sessionStorage.setItem("roomId", roomId)
  }
  getRooms() {
    this.http
      .get(`http://localhost:4000/hotel/${sessionStorage.getItem("hotelId")}`)
      .subscribe((result: any) => {
        try {
          this.rooms = result.rooms
          console.log(result.rooms)
        } catch (err: any) {
          alert(err.message)
        }
      })
  }

  constructor(private http: HttpClient) {
    this.getRooms()
  }
}
