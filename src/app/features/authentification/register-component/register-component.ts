import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import {
  form,
  FormField,
  FormRoot,
  minLength,
  required,
  validate,
  maxLength,
} from '@angular/forms/signals';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-component',
  imports: [FormField, FormRoot],
  standalone: true,
  templateUrl: './register-component.html',
  styleUrl: './register-component.scss',
})
export class RegisterComponent {
  registerModel = signal({
    username: '',
    password: '',
  });

  private readonly router = inject(Router);
  private readonly auth = inject(Auth);
  private snackBar = inject(MatSnackBar);

  registerForm = form(
    this.registerModel,
    (schemaPath) => {
      required(schemaPath.username);
      minLength(schemaPath.username, 2, { message: 'Nom trop court' });
      maxLength(schemaPath.username, 15, { message: 'Nom trop long' });
      validate(schemaPath.username, ({ value }) => {
        if (value().trim().length === 0) {
          return {
            kind: 'whitespace',
            message: 'Un nom est nécessaire',
          };
        }
        return null;
      });

      required(schemaPath.password);
      minLength(schemaPath.password, 8, { message: 'Mot de passe trop court (8 caractères)' });
      validate(schemaPath.password, ({ value }) => {
        if (value().trim().length === 0) {
          return {
            kind: 'whitespace',
            message: 'Votre mot de passe ne doit pas être vide',
          };
        }
        return null;
      });
    },
    {
      submission: {
        action: async () => {
          const formValue = this.registerModel();

          this.auth.register(formValue.username, formValue.password).subscribe({
            next: () => {
              this.snackBar.open('Votre compte a été créé', 'Fermer', {
                duration: 3000,
                panelClass: ['snackbar-success'],
              });
              this.router.navigate(['/login']);
            },
            error: (err) => {
              this.snackBar.open('Erreur dans la création de votre compte', 'Fermer', {
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
