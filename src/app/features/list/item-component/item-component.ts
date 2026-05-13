import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Item } from '../models/item';
import { CommonModule } from '@angular/common';
import { ItemService } from '../services/item';

@Component({
  selector: 'app-item-component',
  imports: [CommonModule],
  templateUrl: './item-component.html',
  styleUrl: './item-component.scss',
  standalone: true,
})
export class ItemComponent {
  @Input() item!: Item;

  @Output() itemDetached = new EventEmitter<number>();
  @Output() itemAttached = new EventEmitter<number>();
  @Output() itemDeleted = new EventEmitter<number>();
  @Output() quantityChanged = new EventEmitter<void>();

  private readonly itemService = inject(ItemService);

  constructor() {}

  handleClick() {
    if (this.item.isArchived) {
      this.itemAttached.emit(this.item.id);
    } else {
      this.itemDetached.emit(this.item.id);
    }
  }

  onDelete(event: MouseEvent) {
    event.stopPropagation();
    this.itemDeleted.emit(this.item.id);
  }

  // Ma méthode pour +1 à la quantité
  onPlus(event: MouseEvent) {
    event.stopPropagation();
    this.itemService.plus(this.item.id).subscribe(() => {
      this.quantityChanged.emit();
    });
  }

  // Ma méthode pour -1 à la quantité
  onMinus(event: MouseEvent) {
    event.stopPropagation();
    if (this.item.quantity <= 0) return;
    this.itemService.minus(this.item.id).subscribe(() => {
      this.quantityChanged.emit();
    });
  }
}
