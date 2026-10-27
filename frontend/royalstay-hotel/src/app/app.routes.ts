import { Routes } from '@angular/router';
import { CmsShell } from './layout/cms-shell/cms-shell';
import { Dashboard } from './pages/dashboard/dashboard';
import { HotelDetail } from './pages/hotels/hotel-detail/hotel-detail';
import { HotelForm } from './pages/hotels/hotel-form/hotel-form';
import { HotelList } from './pages/hotels/hotel-list/hotel-list';
import { Login } from './pages/login/login';
import { ReservationDetail } from './pages/reservations/reservation-detail/reservation-detail';
import { ReservationList } from './pages/reservations/reservation-list/reservation-list';
import { RoomForm } from './pages/rooms/room-form/room-form';
import { RoomList } from './pages/rooms/room-list/room-list';

export const routes: Routes = [
  { title: 'Hotel CMS | Login', path: 'login', component: Login },
  {
    path: '',
    component: CmsShell,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { title: 'Hotel CMS | Dashboard', path: 'dashboard', component: Dashboard },
      // Hotels
      { title: 'Hotel CMS | Hotels', path: 'hotels', component: HotelList },
      { title: 'Hotel CMS | Create hotel', path: 'hotels/new', component: HotelForm },
      { title: 'Hotel CMS | Edit hotel', path: 'hotels/:id/edit', component: HotelForm },
      // Hotel Rooms
      { title: 'Hotel CMS | Hotel rooms', path: 'hotels/:hotelId/rooms', component: RoomList },
      {
        title: 'Hotel CMS | Add room',
        path: 'hotels/:hotelId/rooms/new',
        component: RoomForm,
      },
      {
        title: 'Hotel CMS | Edit room',
        path: 'hotels/:hotelId/rooms/:roomId/edit',
        component: RoomForm,
      },
      { title: 'Hotel CMS | Hotel details', path: 'hotels/:id', component: HotelDetail },
      { title: 'Hotel CMS | Reservations', path: 'reservations', component: ReservationList },
      {
        title: 'Hotel CMS | Reservation details',
        path: 'reservations/:id',
        component: ReservationDetail,
      },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];
