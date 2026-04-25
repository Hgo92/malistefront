import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl= 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  register(username: string, password: string) {
  return this.http.post<{token: string}>(`${this.apiUrl}/api/users/register`, { username, password });
}


  login(username: string, password: string) {
  return this.http.post<{token: string}>(`${this.apiUrl}/auth/login`, { username, password })
    .pipe(tap(res => localStorage.setItem('token', res.token)));
}

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
