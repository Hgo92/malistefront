import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-component',
  imports: [FormsModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.scss',
})

export class RegisterComponent {
  username = '';
  password = '';
  
  private readonly router = inject(Router);
  private readonly auth = inject(Auth);

  constructor() {}

  onRegister() {this.auth.register(this.username, this.password).subscribe({
    next: () => this.router.navigate(['/login']), 
    error : () => console.error("Erreur lors de l'inscription")
  });
} 

  onCancel() {
    this.router.navigate(['/']);
  }
}
