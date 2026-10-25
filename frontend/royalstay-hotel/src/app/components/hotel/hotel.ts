import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-hotel',
  styleUrl: './hotel.css',
  templateUrl: './hotel.html',
})
export class Hotel {
  private route = inject(ActivatedRoute);

  hotelId = this.route.snapshot.paramMap.get('id');
}
