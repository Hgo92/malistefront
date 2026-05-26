import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../authentification/services/auth';

@Component({
  selector: 'app-home-component',
  imports: [],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  constructor() {}

  toLogin() {
    this.router.navigate(['/login']);
  }

  toRegister() {
    this.router.navigate(['/register']);
  }

  toTest() {
    this.auth.login('Invité', 'mdpTestInvite').subscribe({
      next: () => this.router.navigate(['/list']),
      error: () => console.error('Identifiants incorrects'),
    });
  }
}
