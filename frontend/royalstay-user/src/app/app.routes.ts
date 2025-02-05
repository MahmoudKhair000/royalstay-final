import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LocationsComponent } from './components/locations/locations.component';

export const routes: Routes = [
    {
        title: "Homepage",
        path: "",
        component: HomeComponent,
    },
    {
        title: "Homepage",
        path: "home",
        component: HomeComponent,
    },
    {
        title: "Services",
        path: "services",
        component: HomeComponent,
    },
    {
        title: "Locations",
        path: "locations",
        component: LocationsComponent,
    }
];
