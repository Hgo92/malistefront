import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private apiUrl = 'http://localhost:8080/api/items';

  constructor(private http: HttpClient) {}

  getMyItems() {
    return this.http.get<any[]>(`${this.apiUrl}/me`);
  }

  add(name: string) {
    return this.http.post(`${this.apiUrl}/add`, { name });
    
  }
}