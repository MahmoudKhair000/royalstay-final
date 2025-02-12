import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import mongoose from 'mongoose';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import { popResultSelector } from 'rxjs/internal/util/args';

@Component({
  selector: 'app-reserve',
  imports: [FormsModule, RouterLink],
  standalone: true,
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css'
})



export class ReserveComponent {

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  today: string = new Date().toISOString().split("T")[0];
  checkinDate: any = this.today;
  checkoutDate: any = ``;

  days: any = [];
  currentDate: Date = new Date();

  resevreData: any = {
    user: ``,
    userName: "autofill",
    userMail: "autofill",
    userPhone: "autofill",
    userAge: 0,
    hotel: ``,
    hotelName: ``,
    hotelMail: ``,
    hotelPhone: ``,
    roomType: "autofill",
    roomClass: "autofill",
    roomPrice: "autofill",
    days: [],
    total: "autofill",
    notes: ``,
  }

  makeDateArray(start: string, end: string) {
    this.currentDate = new Date(start);

    while (new Date((end)) >= this.currentDate) {

      this.days.push(`${(this.currentDate).toISOString().split(`T`)[0]}`);
      this.currentDate.setDate((this.currentDate.getDate()) + 1);

      if (new Date((end)) == this.currentDate) {
        this.resevreData.days = [...(this.days)];
      }
    }

    console.log(this.checkinDate);
    console.log(this.checkoutDate);
    console.log(this.days);
  }

  constructor(public http: HttpClient, public router: Router) {
    this.http
      .post(`http://localhost:4000/user/id`, { userId: localStorage.getItem("userId") })
      .subscribe((user: any) => {
        console.log(user)
        this.resevreData.user = user._id
        this.resevreData.userName = `${user.firstName} ${user.lastName}`
        this.resevreData.userMail = user.email
        this.resevreData.userPhone = user.phone
        this.resevreData.userAge = user.age
      });
    this.http
      .post(`http://localhost:4000/hotel/id`, { hotelId: localStorage.getItem("hotelId") })
      .subscribe((hotel: any) => {
        console.log(hotel);
        this.resevreData.hotel = hotel._id;
        this.resevreData.hotelName = hotel.name;
        this.resevreData.hotelMail = hotel.email;
        this.resevreData.hotelPhone = hotel.phone;
      })
    this.http
      .post(`http://localhost:4000/room/id`, { hotelId: localStorage.getItem("hotelId"), roomId: localStorage.getItem("roomId") })
      .subscribe((room: any) => {
        console.log(room);
        this.resevreData.roomType = `${room.roomType}`;
        this.resevreData.roomClass = `${room.class}`;
        this.resevreData.roomPrice = room.price;
        this.resevreData.total = room.price * 3;
      })
  }



  bookRooms() {
    // this.http.post(`http://localhost:4000/reservation/add`, {
    //   userId: localStorage.getItem("hotelId"),
    //   hotelId: localStorage.getItem("hotelId"),
    //   roomId: localStorage.getItem("hotelId"),
    //   reservation: this.resevreData
    // }).subscribe((reservation: any) => {
    //   console.log(reservation);
    // })

    console.log(this.resevreData);
  }
  // this.router.navigate(['../'])
}
