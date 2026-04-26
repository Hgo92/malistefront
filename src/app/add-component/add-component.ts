import { Component, EventEmitter, Output } from '@angular/core';
import { ItemService } from '../services/item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-component',
  imports: [FormsModule],
  templateUrl: './add-component.html',
  styleUrl: './add-component.scss',
})
export class AddComponent {
  newItemName = '';

  constructor(private item: ItemService) {}

  @Output() itemAdded = new EventEmitter<void>();
  
  addItem() {
    return this.item.add(this.newItemName).subscribe(() => {
      this.itemAdded.emit();
    });
  }
}
