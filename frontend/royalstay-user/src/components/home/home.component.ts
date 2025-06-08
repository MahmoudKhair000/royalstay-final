import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  hotels: any = {}
  getHotels() {
    this.http
      .get(`http://localhost:4000/hotel/`/*, { request-body-object } */)
      .subscribe((result) => {
        try {
          console.log(typeof (result))
          if ((typeof (result)).toString() != `object`) {
            this.hotels = [result];
          } else {
            this.hotels = result;
          }
          console.log(this.hotels)
        } catch (err: any) {
          alert(err.message);
        }
      })
  };
  constructor(private http: HttpClient) {
    this.getHotels()
  }

  hotel: any = {}
  goToHotel(hotelId: any) {
    sessionStorage.setItem("hotelId", hotelId)
  }
}
