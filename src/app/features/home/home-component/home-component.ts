import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../authentification/services/auth';

@Component({
  selector: 'app-home-component',
  imports: [],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {
  constructor(private router: Router, private auth : Auth) {}

  toLogin() {
    this.router.navigate(['/login']);
  }

  toRegister() {
    this.router.navigate(['/register']);
  }

  toTest() {
    this.auth.login('Invité', 'mdpTestInvité').subscribe({
      next: () => this.router.navigate(['/list']),
      error : () => console.error('Identifiants incorrects')
    });
  }
}
