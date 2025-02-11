import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'app-room-view',
  imports: [CommonModule],
  templateUrl: './room-view.component.html',
  styleUrl: './room-view.component.css'
})
export class RoomViewComponent {
  room: any = null;

  constructor(private route: ActivatedRoute, private roomService:RoomsService) {}

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('id');
    if (roomId) {
      this.roomService.getRoomById(roomId).subscribe(
        (data) => this.room = data,
        (error) => console.error('Failed to fetch room data', error)
      );
    }
  }

}
