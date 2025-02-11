import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:4000/user';

  constructor(private http: HttpClient) { }

  // Register User
  register(userData: any): Observable<any> {
    return this.http.post(`http://localhost:4000/user/register`, userData);
  }

  // Login User
  login(credentials: any): Observable<any> {
    return this.http.post(`http://localhost:4000/user/login`, credentials);
  }

  // Update Profile
  updateProfile(userData: any): Observable<any> {
    return this.http.put('http://localhost:4000/user/update', userData);
  }
}
