import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-room-form',
  styleUrl: './room-form.css',
  templateUrl: './room-form.html',
})
export class RoomForm {
  route = inject(ActivatedRoute);
  // hotelId
}
