import { Component } from '@angular/core';
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

  constructor(private auth: Auth, private router: Router) {}

  onLogin() {
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/']), // Je dois terminer en rajoutant la route vers la page User
      error : () => console.error('Identifiants incorrects')
    });
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
