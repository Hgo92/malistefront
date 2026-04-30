import { Component, OnInit } from '@angular/core';
import { Auth } from '../authentification/services/auth';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmLogoutComponent } from '../authentification/confirm-logout-component/confirm-logout-component';

@Component({
  selector: 'app-header-component',
  imports: [],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent implements OnInit {
  username = "";

constructor(private auth : Auth, private router : Router, private dialog : MatDialog) {}

ngOnInit(): void {
  this.username = this.auth.getUsername() ?? '';
}

// La méthode qui ouvre ma modale
openDialog() {
  const dialogRef = this.dialog.open(ConfirmLogoutComponent, {
    height: '250px',
    width: '400px'
  })
}

onCancel() {
  this.router.navigate(['/']);
}
}