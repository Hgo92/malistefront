import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl= 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) {}

  register(username: string, password: string) {
  return this.http.post<{token: string}>(`${this.apiUrl}/api/users/register`, { username, password })
  .pipe(tap(res => localStorage.setItem('token', res.token)));
}


  login(username: string, password: string) {
  return this.http.post<{token: string}>(`${this.apiUrl}/auth/login`, { username, password })
    .pipe(tap(res => localStorage.setItem('token', res.token)));
}

  getToken() {
    const token = localStorage.getItem('token');
    if (!token) return null 

    if (this.isTokenExpired(token)) {
      this.logout();
      return null
    }

    return token
  }

  isTokenExpired(token?: string) : boolean {
    const t = token ?? localStorage.getItem('token');
    if (!t) return true

    try {
      const {exp} = JSON.parse(atob(t.split('.')[1]));
      if (!exp) return false;
      return Date.now() >= exp * 1000;
    } catch {
      return true
    }

  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getUsername(): string | null {
  const token = this.getToken();
  if (!token) return null;
  try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub ?? null;
    } catch {
      return null; 
    }
}
}
