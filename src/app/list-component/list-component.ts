import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ItemComponent } from '../item-component/item-component';
import { ItemService } from '../services/item';
import { Item } from '../models/item';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-component',
  imports: [CommonModule, ItemComponent],
  templateUrl: './list-component.html',
  styleUrl: './list-component.scss',
})
export class ListComponent implements OnInit{
  items: Item[] = [];
  username = '';

  constructor(private itemService: ItemService, private auth: Auth, private router: Router) {}

  ngOnInit() {
    this.itemService.getMyItems().subscribe(data => this.items = data);
    this.username = this.auth.getUsername() ?? '';
  }

  onItemAdded() {
    this.itemService.getMyItems().subscribe(data => this.items = data);
  }

  toAddComponent() {
    this.router.navigate(['/add']);
  }
}
