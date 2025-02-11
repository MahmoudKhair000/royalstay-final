import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserSignComponent } from '../user-sign/user-sign.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, NgbModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  userId:any = localStorage.getItem("userId")

  constructor( private router: Router){}
  logOut() {
    localStorage.removeItem("userId")
    this.router.navigate(['../'])
  }
}
