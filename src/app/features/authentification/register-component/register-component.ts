import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { form, FormField, FormRoot, minLength, required, validate, maxLength } from '@angular/forms/signals';

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
    password:'',
  });
  
  private readonly router = inject(Router);
  private readonly auth = inject(Auth);


  registerForm = form(
    this.registerModel,
    (schemaPath) => {
      required (schemaPath.username, {message : "Un nom est nécessaire"});
      minLength(schemaPath.username, 2, {message : "Nom trop court"});
      maxLength(schemaPath.username, 15, {message : "Nom trop long"});
      validate(schemaPath.username, ({value}) => {
        if (value().trim().length === 0) {
          return {
            kind: "whitespace",
            message: "Votre nom d'utilisateur ne doit pas être vide"
          };
        }
        return null;
      });

      required (schemaPath.password, {message : "Un mot de passe est nécessaire"});
      minLength(schemaPath.password, 8, {message : "Mot de passe trop court (8 caractères)"});
            validate(schemaPath.password, ({value}) => {
        if (value().trim().length === 0) {
          return {
            kind: "whitespace",
            message: "Votre mot de passe ne doit pas être vide"
          };
        }
        return null;
      });
    },
    {
      submission : {
        action: async () => {

          const formValue = this.registerModel();

          this.auth.register(
            formValue.username,
            formValue.password
          ).subscribe({
            next: () => {
               this.router.navigate(['/login']);
            },
            error: err => console.error(err)
          });
        }
      }
    }
  );

  onCancel() {
    this.router.navigate(['/']);
  }
}
