import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../token';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private readonly apiUrl = inject(API_URL);

  private readonly http = inject(HttpClient)

  constructor() {}

  getMyItems() {
    return this.http.get<any[]>(`${this.apiUrl}/api/items/me`);
  }

  add(name: string, quantity: number) {
    return this.http.post(`${this.apiUrl}/api/items/add`, { name, quantity }, { responseType: 'text' });
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/api/items/${id}`);
  }

  detach(id: number) {
    return this.http.put(`${this.apiUrl}/api/items/${id}/detach`, {}, {responseType : 'text'});
  }

  attach(id: number) {
    return this.http.put(`${this.apiUrl}/api/items/${id}/attach`, {}, {responseType : 'text'});
  }

  plus(id: number) {
    return this.http.put(`${this.apiUrl}/api/items/${id}/plus`, {}, {responseType: 'text'});
  }

  minus(id: number) {
    return this.http.put(`${this.apiUrl}/api/items/${id}/minus`, {}, {responseType: 'text'});
  }
}