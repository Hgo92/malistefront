import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-auth-component',
  imports: [FormsModule],
  templateUrl: './auth-component.html',
  styleUrl: './auth-component.scss',
})
export class AuthComponent {
  username = '';
  password = '';

  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  constructor() {}

  onLogin() {
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/list']),
      error : () => console.error('Identifiants incorrects')
    });
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
