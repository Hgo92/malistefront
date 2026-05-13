import { Observable, Subject } from 'rxjs';
import { map, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Auth } from '@authentication/services/auth';

import { HeaderComponent } from '../../header-component/header-component';
import { AddComponent } from '../add-component/add-component';
import { ItemComponent } from '../item-component/item-component';
import { Item } from '../models/item';
import { ItemService } from '../services/item';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list-component',
  imports: [ItemComponent, HeaderComponent, AsyncPipe],
  templateUrl: './list-component.html',
  styleUrl: './list-component.scss',
})
export class ListComponent implements OnInit {
  username = '';

  private refresh$ = new Subject<void>();
  private readonly destroyRef = inject(DestroyRef);
  private readonly auth = inject(Auth);
  private readonly itemService = inject(ItemService);
  private readonly dialog = inject(MatDialog);

  items$: Observable<Item[]> = this.refresh$.pipe(
    startWith(null),
    switchMap(() => this.itemService.getMyItems()),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  activeItems$ = this.items$.pipe(
    map((items) => items.filter((item) => !item.isArchived).sort((a, b) => a.id - b.id)),
  );

  archivedItems$ = this.items$.pipe(
    map((items) => items.filter((item) => item.isArchived).sort((a, b) => a.id - b.id)),
  );

  // Au lancement, je récupère l'username pour pouvoir l'afficher
  ngOnInit() {
    this.username = this.auth.getUsername() ?? '';
  }

  // Méthode pour recharger mes items si besoin
  loadItems() {
    this.refresh$.next();
  }

  // Mes méthodes pour détacher un item d'une liste, l'attacher et le supprimer
  onDetach(id: number) {
    this.itemService
      .detach(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.loadItems());
  }

  onAttach(id: number) {
    this.itemService
      .attach(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.loadItems());
  }

  onDelete(id: number) {
    this.itemService
      .delete(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.loadItems());
  }

  // Mon Dialog/modale pour ajouter un item
  toAddComponent() {
    const dialogRef = this.dialog.open(AddComponent);

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.loadItems());
  }
}
