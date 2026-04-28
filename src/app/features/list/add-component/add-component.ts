import { Component, EventEmitter, Output } from '@angular/core';
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
  
  
  constructor(private item: ItemService, private router : Router, private dialogRef: MatDialogRef<AddComponent>) {}
  
  addItem() {
    return this.item.add(this.newItemName).subscribe(() => {
      this.dialogRef.close(true);

    });
  }

  cancel() {
    this.router.navigate(['/list'])
  }
}
