import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ItemComponent } from '../item-component/item-component';
import { ItemService } from '../services/item';
import { Item } from '../models/item';
import { Auth } from '../../authentification/services/auth';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, startWith, shareReplay } from 'rxjs/operators';
import { HeaderComponent } from '../../header-component/header-component';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add-component/add-component';


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

  private readonly auth = inject(Auth);
  private readonly itemService = inject(ItemService);
  private readonly dialog = inject(MatDialog);

  constructor() {}

  // Au lancement, je récupère l'username pour pouvoir l'afficher
  ngOnInit() {
    this.username = this.auth.getUsername() ?? '';
  }

  // Méthode pour recharger mes items si besoin
  loadItems() {
    this.refresh$.next();
  }

  // Mes méthodes pour détacher un item d'une liste, l'attacher et le supprimer
  onDetach(id : number) {
    this.itemService.detach(id).subscribe(() => this.loadItems());
  }

  onAttach(id : number) {
    this.itemService.attach(id).subscribe(() => this.loadItems());
  }

  onDelete(id: number) {
    this.itemService.delete(id).subscribe(() => this.loadItems());
  }

  // Mon Dialog/modale pour ajouter un item
  toAddComponent() {
      const dialogRef = this.dialog.open(AddComponent, {
        height: '375px',
        width: '300px'
      });

      dialogRef.afterClosed().subscribe(() => this.loadItems())
  }
}
