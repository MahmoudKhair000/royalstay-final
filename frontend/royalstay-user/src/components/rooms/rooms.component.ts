import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-rooms',
  imports: [FormsModule,RouterLink],
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

  userId = localStorage.getItem('userId');

  today: string = new Date().toISOString().split("T")[0];
  selected: any;


  rooms: any = {};
  hotelName: any;
  roomCount: any = [];
  reservations: any = [];

  getCount() {
    console.log(this.selected);

    let rooms = this.rooms;
    this.reservations = [];
    this.roomCount = [];
    for (let i = 0; i < rooms.length; i++) {
      let roomId = rooms[i]._id;
      this.http
        .get(`http://localhost:4000/reservation/room/${roomId}`)
        .subscribe((reserved: any) => {
          reserved.filter((x: any) => {
            if (x.days.includes(`${this.selected}`)) {
              return this.reservations[i] = x;
            } else { return null };
          })
          // console.log(reserved, reserved.length);
          this.roomCount[i] = reserved.length;
          console.log(reserved);
        })
    }
    console.log('room count ', this.roomCount);
  }
  getRooms() {
    this.http
      .post(`http://localhost:4000/hotel/id`, { hotelId: localStorage.getItem("hotelId") })
      .subscribe((result: any) => {
        try {
          this.rooms = result.rooms;
          this.hotelName = result.name;
          // console.log(result.rooms);
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
