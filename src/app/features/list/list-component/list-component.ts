import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Auth } from '@authentication/services/auth';

import { HeaderComponent } from '../../header-component/header-component';
import { AddComponent } from '../add-component/add-component';
import { ItemComponent } from '../item-component/item-component';
import { ItemService } from '../services/item';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list-component',
  imports: [ItemComponent, HeaderComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list-component.html',
  styleUrl: './list-component.scss',
})
export class ListComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly auth = inject(Auth);
  private readonly itemService = inject(ItemService);
  private readonly dialog = inject(MatDialog);

  protected username = signal(this.auth.getUsername() ?? '');
  protected activeItems$ = this.itemService.activeItems$;
  protected archivedItems$ = this.itemService.archivedItems$;

  // Méthode pour recharger mes items si besoin
  protected loadItems() {
    this.itemService.refresh();
  }

  // Mes méthodes pour détacher un item d'une liste, l'attacher et le supprimer
  protected onDetach(id: number) {
    this.itemService
      .detach(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.loadItems());
  }

  protected onAttach(id: number) {
    this.itemService
      .attach(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.loadItems());
  }

  protected onDelete(id: number) {
    this.itemService
      .delete(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.loadItems());
  }

  // Mon Dialog/modale pour ajouter un item
  protected toAddComponent() {
    const dialogRef = this.dialog.open(AddComponent);

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.loadItems());
  }
}
