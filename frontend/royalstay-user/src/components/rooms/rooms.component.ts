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

  rooms: any = {};
  hotelName: any;
  goToRoom(roomId: any) {
    localStorage.setItem("roomId", roomId)
    this.router.navigate(['../roomview/'])
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




  reservations = []
  roomCount = [``];
  getCount() {
    for (let i = 0; i < this.rooms; i++) {
      let roomId = this.rooms[i]._id
      this.http
        .get(`http://localhost:4000/reservation/room/${roomId}`)
        .subscribe((reserved: any) => {
          try {
            this.reservations = reserved;
            this.roomCount.push(reserved.length)
            console.log(reserved);
            console.log(this.roomCount);
          } catch (err: any) {
            console.log(err.message)
          }
        })
    }
  }

  constructor(private http: HttpClient, private router: Router) {
    this.getRooms()
    this.getCount()
  }
}
