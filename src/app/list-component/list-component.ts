import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ItemComponent } from '../item-component/item-component';
import { ItemService } from '../services/item';
import { Item } from '../models/item';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, startWith, shareReplay } from 'rxjs/operators';
import { HeaderComponent } from '../header-component/header-component';


@Component({
  selector: 'app-list-component',
  imports: [CommonModule, ItemComponent, HeaderComponent],
  templateUrl: './list-component.html',
  styleUrl: './list-component.scss',
})
export class ListComponent implements OnInit{
  username = '';

  private refresh$ = new Subject<void>();

  items$: Observable<Item[]> = this.refresh$.pipe(
    startWith(null),
    switchMap(() => this.itemService.getMyItems()),
    shareReplay(1)
  );

  activeItems$ = this.items$.pipe(
    map(items => items.filter(item => !item.isArchived))
  );

  archivedItems$ = this.items$.pipe(
    map(items => items.filter(item => item.isArchived))
  );

  constructor(
    private itemService: ItemService, 
    private auth: Auth, 
    private router: Router) {}

  ngOnInit() {
    this.username = this.auth.getUsername() ?? '';
  }

  loadItems() {
    this.refresh$.next();
  }

  onDetach(id : number) {
    this.itemService.detach(id).subscribe(() => this.loadItems());
  }

  onAttach(id : number) {
    this.itemService.attach(id).subscribe(() => this.loadItems());
  }

  onDelete(id: number) {
    this.itemService.delete(id).subscribe(() => this.loadItems());
  }

  toAddComponent() {
    this.router.navigate(['/add']);
  }
}
