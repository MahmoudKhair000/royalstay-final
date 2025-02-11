import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  login(token: string): void {
    localStorage.setItem('authToken', token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    window.location.href='/login';
  }
}
