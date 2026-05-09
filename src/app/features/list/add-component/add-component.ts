import { Component, signal, inject } from '@angular/core';
import { ItemService } from '../services/item';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { form, FormField, FormRoot, required, minLength, min, max, validate } from '@angular/forms/signals';


@Component({
  selector: 'app-add-component',
  imports: [FormField, FormRoot, MatDialogModule],
  templateUrl: './add-component.html',
  styleUrl: './add-component.scss',
})
export class AddComponent {
  addModel = signal({
    name:'',
    quantity: 1,
  })
  
  private readonly router = inject(Router);
  private readonly item = inject(ItemService);
  private readonly dialogRef = inject(MatDialogRef<AddComponent>);
  
  constructor() {}

  addForm = form(
    this.addModel,
    (schemaPath) => {
      required(schemaPath.name);
      minLength(schemaPath.name, 2);
      validate(schemaPath.name, ({value}) => {
        if (value().trim().length === 0) {
          return {
            kind: "whitespace",
            message: "Le nom de votre article ne doit pas être vide"
          };
        }
        return null;
      })
   
      required(schemaPath.quantity);
    },
    {
      submission : {
        action: async () => {
          const formValue = this.addModel();

          this.item.add(
            formValue.name,
            formValue.quantity
          ).subscribe({
            next: () => {
              this.dialogRef.close(true);
            },
            error: err => console.error(err)
          });
      }
      }
    }
  );

  // Ma méthode pour annuler et revenir à la liste
  cancel() {
    this.router.navigate(['/list'])
  }
}
