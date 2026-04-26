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
    this.itemService.getMyItems().subscribe(data => 
      {console.log('items reçus :', data);
        this.items = data;
        console.log('items.length :', this.items.length);
      });
    this.username = this.auth.getUsername() ?? '';
  }

  toAddComponent() {
    this.router.navigate(['/add']);
  }
}
