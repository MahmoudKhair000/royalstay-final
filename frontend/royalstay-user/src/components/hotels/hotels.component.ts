import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hotels',
  imports: [RouterLink],
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.css'
})
export class HotelsComponent {
  ngOnInit() {
    window.scrollTo(0, 0);
  }
  hotels: any = {}
  getHotels() {
    this.http
      .get(`http://localhost:4000/hotel/`/*, { request-body-object } */)
      .subscribe((result: any) => {
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
    localStorage.setItem("hotelId", hotelId)
  }
}
