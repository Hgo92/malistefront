import { Component } from '@angular/core';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-confirm-logout-component',
  imports: [MatDialogModule],
  templateUrl: './confirm-logout-component.html',
  styleUrl: './confirm-logout-component.scss',
})
export class ConfirmLogoutComponent {

  constructor(private auth : Auth, private router : Router) {}

  // Ma méthode pour me déconnecter
  onLogout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
