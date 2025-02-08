import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LocationsComponent } from '../components/locations/locations.component';
import { ServicesComponent } from '../components/services/services.component';
import { ResQueryComponent } from '../components/res-query/res-query.component';
import { HotelsComponent } from '../components/hotels/hotels.component';
import { ResFormComponent } from '../components/res-form/res-form.component';
import { RoomsComponent } from '../components/rooms/rooms.component';
import { RoomViewComponent } from '../components/room-view/room-view.component';
import { AboutComponent } from '../components/about/about.component';

export const routes: Routes = [
    {
        title: "RoyalStay",
        path: "",
        component: HomeComponent,
    },
    {
        title: "RoyalStay",
        path: "home",
        component: HomeComponent,
    },
    {
        title: "Services",
        path: "services",
        component: ServicesComponent,
    },
    {
        title: "Locations",
        path: "locations",
        component: LocationsComponent,
    },
    {
        title: "User - Sign",
        path: "user-sign",
        component: LocationsComponent,
    },
    {
        title: "Explore Hotels",
        path: "hotels",
        component: HotelsComponent,
    },
    {
        title: "Pick a room",
        path: "hotel/rooms",
        component: RoomsComponent,
    },
    {
        title: "Room preview",
        path: "rooms",
        component: RoomViewComponent,
    },
    {
        title: "Reserve",
        path: "res-form",
        component: ResFormComponent,
    },
    {
        title: "Reservations",
        path: "res-query",
        component: ResQueryComponent,
    },
    {
        title: "About",
        path: "about",
        component: AboutComponent,
    },
];
