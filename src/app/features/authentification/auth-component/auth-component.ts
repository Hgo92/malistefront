import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import {
  FormField,
  FormRoot,
  form,
  maxLength,
  minLength,
  required,
  validate,
} from '@angular/forms/signals';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth-component',
  imports: [FormField, FormRoot],
  standalone: true,
  templateUrl: './auth-component.html',
  styleUrl: './auth-component.scss',
})
export class AuthComponent {
  loginModel = signal({
    username: '',
    password: '',
  });

  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private snackBar = inject(MatSnackBar);

  loginForm = form(
    this.loginModel,
    (schemaPath) => {
      required(schemaPath.username, { message: 'Un nom est nécessaire' });
      required(schemaPath.password, { message: 'Un mot de passe est nécessaire' });
    },
    {
      submission: {
        action: async () => {
          const formValue = this.loginModel();

          this.auth.login(formValue.username, formValue.password).subscribe({
            next: () => {
              this.router.navigate(['/list']);
              this.snackBar.open(`Coucou, ${formValue.username} 👋`, 'Fermer', {
                duration: 3000,
                panelClass: ['snackbar-success'],
              });
            },
            error: (err) => {
              this.snackBar.open('Erreur de connexion', 'Fermer', {
                duration: 3000,
                panelClass: ['snackbar-error'],
              });
              console.error(err);
            },
          });
        },
      },
    },
  );

  onCancel() {
    this.router.navigate(['/']);
  }
}
