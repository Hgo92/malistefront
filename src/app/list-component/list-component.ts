import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ItemComponent } from '../item-component/item-component';

@Component({
  selector: 'app-list-component',
  imports: [CommonModule, ItemComponent],
  templateUrl: './list-component.html',
  styleUrl: './list-component.scss',
})
export class ListComponent {}
