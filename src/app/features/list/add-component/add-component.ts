import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ItemService } from '../services/item';
import { FormsModule } from '@angular/forms';
import { Item } from '../models/item';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-component',
  imports: [FormsModule, MatDialogModule],
  templateUrl: './add-component.html',
  styleUrl: './add-component.scss',
})
export class AddComponent {
  newItemName = '';
  newItemNumber = 1;
  
  private readonly router = inject(Router);
  private readonly item = inject(ItemService);
  private readonly dialogRef = inject(MatDialogRef<AddComponent>);
  
  // Ma méthode pour valider l'envoi d'un item
  addItem() {
    return this.item.add(this.newItemName).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  // Ma méthode pour annuler et revenir à la liste
  cancel() {
    this.router.navigate(['/list'])
  }
}
