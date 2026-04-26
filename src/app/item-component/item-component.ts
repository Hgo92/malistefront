import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../models/item';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-item-component',
  imports: [CommonModule],
  templateUrl: './item-component.html',
  styleUrl: './item-component.scss',
  standalone: true
})
export class ItemComponent {
  @Input() item!: Item;

  @Output() itemDetached = new EventEmitter<number>();
  @Output() itemAttached = new EventEmitter<number>();
  @Output() itemDeleted = new EventEmitter<number>();

  onDetach() { this.itemDetached.emit(this.item.id); }
  onAttach() { this.itemAttached.emit(this.item.id); }
  onDelete(event : MouseEvent) { 
    event.stopPropagation();
    this.itemDeleted.emit(this.item.id); }
}
