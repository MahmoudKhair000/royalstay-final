import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import mongoose from 'mongoose';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import { popResultSelector } from 'rxjs/internal/util/args';

@Component({
  selector: 'app-reserve',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css'
})



export class ReserveComponent {

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  today: string = new Date().toISOString().split("T")[0];
  checkinDate: any = ``;
  checkoutDate: any = ``;

  currentDate: Date = new Date();
  days = [``];

  resevreData = {
    user: ``,
    userName: ``,
    userMail: ``,
    userPhone: ``,
    userAge: 0,
    hotel: ``,
    hotelName: ``,
    hotelMail: ``,
    hotelPhone: ``,
    room: ``,
    roomType: ``,
    roomClass: ``,
    roomPrice: 0,
    days: [``],
    total: 0,
    notes: ``,
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
      });
    this.http
      .post(`http://localhost:4000/room/id`, { hotelId: localStorage.getItem("hotelId"), roomId: localStorage.getItem("roomId") })
      .subscribe((room: any) => {
        console.log(room);
        this.resevreData.room = `${room._id}`;
        this.resevreData.roomType = `${room.roomType}`;
        this.resevreData.roomClass = `${room.class}`;
        this.resevreData.roomPrice = room.price;
      });
  }

  makeDateArray(start: string, end: string) {
    this.currentDate = new Date(start);

    this.days = [];
    while (new Date((end)) >= this.currentDate) {
      this.days.push(`${(this.currentDate).toISOString().split(`T`)[0]}`);
      this.currentDate.setDate((this.currentDate.getDate()) + 1);
    }
    this.resevreData.days = this.days;
    this.resevreData.total = this.resevreData.roomPrice * this.resevreData.days.length;

    // console.log("out:", this.days);
    // console.log(this.days.length);
    // console.log(`-------------------------------------------------------------------`);
    // console.log("in:", this.resevreData.days);
    // console.log(this.resevreData.days.length);
  }

  bookRooms() {
    if (this.resevreData.days[0].length != 10) {
      window.alert("Choose end and start date")
    } else (
      this.http
        .post(`http://localhost:4000/reservation/add`, {
          userId: localStorage.getItem("hotelId"),
          hotelId: localStorage.getItem("hotelId"),
          roomId: localStorage.getItem("hotelId"),
          reservation: this.resevreData,
        }).subscribe((res: any) => {
          try {
            console.log(res);
            this.router.navigate(['../res-query'])
            window.alert('Reserved !!')
          } catch (err) {
            window.alert('Error !!')
            console.log(err);
          }
        })
    )
  }
}
