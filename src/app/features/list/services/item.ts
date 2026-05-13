import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../token';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { Item } from '../models/item';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private readonly apiUrl = inject(API_URL);
  private readonly refresh$ = new Subject<void>();
  private readonly http = inject(HttpClient);

  private items$: Observable<Item[]> = this.refresh$.pipe(
    startWith(null),
    switchMap(() => this.getMyItems()),
    map((items) => items.sort((a, b) => b.id - a.id)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  public activeItems$ = this.items$.pipe(map((items) => items.filter((item) => !item.isArchived)));

  public archivedItems$ = this.items$.pipe(map((items) => items.filter((item) => item.isArchived)));

  refresh() {
    this.refresh$.next();
  }

  private getMyItems() {
    return this.http.get<any[]>(`${this.apiUrl}/api/items/me`);
  }

  public add(name: string, quantity: number) {
    return this.http.post(
      `${this.apiUrl}/api/items/add`,
      { name, quantity },
      { responseType: 'text' },
    );
  }

  public delete(id: number) {
    return this.http.delete(`${this.apiUrl}/api/items/${id}`);
  }

  public detach(id: number) {
    return this.http.put(`${this.apiUrl}/api/items/${id}/detach`, {}, { responseType: 'text' });
  }

  public attach(id: number) {
    return this.http.put(`${this.apiUrl}/api/items/${id}/attach`, {}, { responseType: 'text' });
  }

  public plus(id: number) {
    return this.http.put(`${this.apiUrl}/api/items/${id}/plus`, {}, { responseType: 'text' });
  }

  public minus(id: number) {
    return this.http.put(`${this.apiUrl}/api/items/${id}/minus`, {}, { responseType: 'text' });
  }
}
