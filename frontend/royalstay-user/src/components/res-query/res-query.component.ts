import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { SchemaType, SchemaTypes } from 'mongoose';
// const mongoose = require('mongoose');

@Component({
  selector: 'app-res-query',
  imports: [CommonModule, FormsModule],
  templateUrl: './res-query.component.html',
  styleUrl: './res-query.component.css'
})

export class ResQueryComponent {
  ngOnInit() {
    window.scrollTo(0, 0);
  }

  reservations: any = {};
  userId: any = localStorage.getItem("userId");

  constructor(public http: HttpClient) {
    this.http
      .get(`http://localhost:4000/reservation/user/${this.userId}`/*, { request-body-object } */)
      .subscribe((result) => {
        if ((typeof (result)).toString() != `object`) {
          this.reservations = [result];
        } else {
          this.reservations = result;
        }
      })
  };
}