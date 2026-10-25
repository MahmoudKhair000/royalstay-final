import { Routes } from '@angular/router';
import { HomePage } from './components/home-page/home-page';
import { Hotel } from './components/hotel/hotel';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    title: 'Hotel CMS | Home',
    path: 'home',
    component: HomePage,
  },
  {
    title: 'Hotel CMS | Hotel dash',
    path: 'hotel/:id',
    component: Hotel,
  },
  //
];
