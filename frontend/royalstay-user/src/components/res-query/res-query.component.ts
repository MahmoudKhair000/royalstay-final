import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ArrayType } from '@angular/compiler';
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
  reservations: any = {}

  userId: any = `675074f54aa1968e289d6d6b`;

  reserve() {
    this.http
      .get(`http://localhost:4000/reservation/user/${this.userId}`)
      .subscribe((result) => {
        try {
          console.log(typeof(result))
          if ((typeof(result)).toString() != `Array`) {
            this.reservations = [result];
          } else {
            this.reservations = result;
          }
          this.reservations = [result];
          console.log(this.reservations)
        } catch (err: any) {
          alert(err.message);
        }
      })
  }

  constructor(private http: HttpClient) { this.reserve() }
}
