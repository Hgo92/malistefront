import { Component, Input } from '@angular/core';

import { Item } from '../models/item';

@Component({
  selector: 'app-item-component',
  imports: [],
  templateUrl: './item-component.html',
  styleUrl: './item-component.scss',
  standalone: true
})
export class ItemComponent {
  @Input() item!: Item;
}
