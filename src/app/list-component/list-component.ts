import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ItemComponent } from '../item-component/item-component';
import { ItemService } from '../services/item';
import { Item } from '../models/item';

@Component({
  selector: 'app-list-component',
  imports: [CommonModule, ItemComponent],
  templateUrl: './list-component.html',
  styleUrl: './list-component.scss',
})
export class ListComponent implements OnInit{
  items: Item[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.getMyItems().subscribe(data => this.items = data);
  }
}
