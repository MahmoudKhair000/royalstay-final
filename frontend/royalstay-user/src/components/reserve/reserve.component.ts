import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reserve',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css'
})
export class ReserveComponent {

  resevreData: any = {
    name: "autofill",
    email: "autofill",
    phone: "autofill",
    roomType: "autofill",
    roomClass: "autofill",
    salaryPerDay: "autofill",
    checkinDate: "",
    checkoutDate: "",
    totalSalary: "autofill",
  }

  constructor(private http: HttpClient) {
    this.http
      .get(`http://localhost:4000/user/id/${localStorage.getItem("userId")}`)
      .subscribe((user: any) => {
        console.log(user)
        this.resevreData.name = `${user.firstName} ${user.lastName}`
        this.resevreData.email = `${user.email}`
        this.resevreData.phone = `${user.phone}`
      });
    this.http
      .post(`http://localhost:4000/room/id`, { hotelId: localStorage.getItem("hotelId"), roomId: localStorage.getItem("roomId") }).subscribe(
        (room: any) => {
          console.log(room);
          this.resevreData.roomType = `${room.roomType}`;
          this.resevreData.roomClass = `${room.class}`;
          this.resevreData.salaryPerDay = `${room.price}`;
        }
      )
  }


  bookRooms() {
    console.log('Room booked:', this.resevreData);
  }
}
