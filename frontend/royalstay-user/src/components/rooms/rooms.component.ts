import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-rooms',
  imports: [],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  goToRoom(roomId: any) {
    localStorage.setItem("roomId", roomId)
    this.router.navigate(['../roomview/'])
  }

  rooms: any = {};
  hotelName: any;

  roomCount: any = [];

  getCount() {
    let rooms = this.rooms;
    this.roomCount = [];
    for (let i = 0; i < rooms.length; i++) {
      this.http
        .get(`http://localhost:4000/reservation/room/${rooms[i]._id}`)
        .subscribe((reserved: any) => {
          console.log(reserved);
          this.roomCount.push(reserved.length)
          console.log(reserved.length);
        })
    }
    console.log(this.roomCount);
  }

  getRooms() {
    this.http
      .post(`http://localhost:4000/hotel/id`, { hotelId: localStorage.getItem("hotelId") })
      .subscribe((result: any) => {
        try {
          this.rooms = result.rooms;
          this.hotelName = result.name;
          console.log(result.rooms);
          this.getCount();
        } catch (err: any) {
          alert(err.message)
        }
      })
  }

  constructor(private http: HttpClient, private router: Router) {
    this.getRooms();
  }
}
