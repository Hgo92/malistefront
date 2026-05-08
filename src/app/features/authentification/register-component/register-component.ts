import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';

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
      required(schemaPath.username);
      minLength(schemaPath.username, 3)
      required(schemaPath.password);
      minLength(schemaPath.password, 8);
    },
    {
      submission : {
        action: async (field) => {
          const { username, password } = this.registerModel()
          
          try {
            await firstValueFrom(this.auth.register(username, password));
            await this.router.navigate(['/login']);
            return;
          } catch (error) {
            return { kind : 'serverError', message: "L'inscription n'a pas fonctionné"}
          }
        }
      }
    }
  );


  onCancel() {
    this.router.navigate(['/']);
  }
}
