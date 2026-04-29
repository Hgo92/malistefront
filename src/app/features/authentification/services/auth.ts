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

  // Méthode pour enregistrer un nouvel utilisateur
  register(username: string, password: string) {
  return this.http.post<{token: string}>(`${this.apiUrl}/api/users/register`, { username, password })
  .pipe(tap(res => localStorage.setItem('token', res.token)));
}

  // Méthode pour se connecter
  login(username: string, password: string) {
  return this.http.post<{token: string}>(`${this.apiUrl}/auth/login`, { username, password })
    .pipe(tap(res => localStorage.setItem('token', res.token)));
}

  // Méthode pour checker dans le local storage si l'utilisateur est connecté (et si le token n'est pas expiré)
  getToken() {
    const token = localStorage.getItem('token');
    if (!token) return null 

    if (this.isTokenExpired(token)) {
      this.logout();
      return null
    }

    return token
  }

  // Méthode pour checker si le token est expiré
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

  // Méthode pour checker si l'utilisateur est connecté
  isLoggedIn() {
    return this.getToken() !== null;
  }

  // Méthode pour se déconnecter
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Méthode pour récupérer le nom d'utilisateur (à partir du token)
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
