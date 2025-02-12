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

  ngOnInit() {
    window.scrollTo(0, 0);
  }
  
  rooms: any = {};
  hotelName: any;
  goToRoom(roomId: any) {
    localStorage.setItem("roomId", roomId)
  }
  getRooms() {
    this.http
      .post(`http://localhost:4000/hotel/id`, { hotelId: localStorage.getItem("hotelId") })
      .subscribe((result: any) => {
        try {
          this.rooms = result.rooms
          this.hotelName = result.name
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
