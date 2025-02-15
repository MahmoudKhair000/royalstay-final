import { Component, resource } from '@angular/core';
// import { ApiService } from '../services/api.services';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
// import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import mongoose from 'mongoose';
import { ResourceLoader } from '@angular/compiler';
@Component({
  selector: 'app-user-sign',
  standalone: true,
  templateUrl: './user-sign.component.html',
  styleUrls: ['./user-sign.component.css'],
  imports: [CommonModule, NgIf, NgClass, FormsModule, MatSnackBarModule]
})
export class UserSignComponent {

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  isRegisterMode: any;
  isSignedIN: boolean = false

  userId: any = localStorage.getItem("userId");

  userData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    age: null,
    gender: ''
  };

  credentials = {
    email: '',
    password: ''
  };

  newUser: any;
  signUser: any;

  constructor(private http: HttpClient, private router: Router) { }

  toggleMode() { this.isRegisterMode = !this.isRegisterMode; }

  registerUser() {
    this.http
      .post("http://localhost:4000/user/register", this.userData)
      .subscribe(
        (result: any) => {
          try {
            this.newUser = result;
            localStorage.setItem("userId", this.newUser._id)
            this.router.navigate(['../'])
          } catch (err: any) {
            alert(err)
          }
        })
  }

  loginUser() {
    this.http
      .post("http://localhost:4000/user/login", this.credentials)
      .subscribe((result: any) => {
        try {
          this.signUser = result.user;
          localStorage.setItem("userId", this.signUser._id)
          this.router.navigate(['../'])
        } catch (err: any) {
          alert(err)
        }
      })
  }

  logOut() {
    localStorage.removeItem("userId");
    window.location.reload();
  }
  // constructor(private apiService: ApiService, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  // showSnackbar(message: string, type: 'success' | 'error') {
  //   this.snackBar.open(message, 'Close', {
  //     duration: 5000,
  //     panelClass: [`${type}-snackbar`]
  //   });
  // }

  // registerUser() {
  //   console.log(this.userData);
  //   this.apiService.register(this.userData).subscribe({
  //     next: (response) => {
  //       this.showSnackbar('successfully done!', 'success');
  //       this.router.navigate(['../profile']);
  //     },
  //     error: (error) => {
  //       this.showSnackbar(error.error.message || 'Registration failed!', 'error');
  //     }
  //   });
  // }

  // loginUser() {
  //   this.apiService.login(this.credentials).subscribe({
  //     next: (response) => {
  //       const token = 'mock-jwt-token';
  //       this.authService.login(token);
  //       this.router.navigate(['/profile']);
  //     },
  //     error: (error) => {
  //       this.showSnackbar(error.error.message || 'Login failed!', 'error');
  //     }
  //   });
  // }
}


