import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';

@Component({
  selector: 'app-auth-component',
  imports: [FormField, FormRoot],
  standalone: true,
  templateUrl: './auth-component.html',
  styleUrl: './auth-component.scss',
})
export class AuthComponent {
  loginModel = signal ({
    username: '',
    password: '',
  })

  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  loginForm = form(
    this.loginModel,
    (schemaPath) => {
      required (schemaPath.username);
      required (schemaPath.password);
    }, 
    {
      submission : {
        action : async() => {
          try {
            this.auth.login(this.loginForm.username().value(), this.loginForm.password().value());
            await this.router.navigate(['/list'])
            return
          }
          catch (error) {
            return {kind : 'serverError', message: "La connexion n'a pas fonctionné"}
          }
        }
      }
    }
  );

  onCancel() {
    this.router.navigate(['/']);
  }
}
