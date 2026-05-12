import { Component, signal, inject } from '@angular/core';
import { ItemService } from '../services/item';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  form,
  FormField,
  FormRoot,
  required,
  minLength,
  min,
  max,
  validate,
} from '@angular/forms/signals';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-component',
  imports: [FormField, FormRoot, MatDialogModule],
  templateUrl: './add-component.html',
  styleUrl: './add-component.scss',
})
export class AddComponent {
  addModel = signal({
    name: '',
    quantity: 1,
  });

  private readonly item = inject(ItemService);
  private readonly dialogRef = inject(MatDialogRef<AddComponent>);
  private snackBar = inject(MatSnackBar);

  constructor() {}

  addForm = form(
    this.addModel,
    (schemaPath) => {
      required(schemaPath.name);
      minLength(schemaPath.name, 2);
      validate(schemaPath.name, ({ value }) => {
        if (value().trim().length === 0) {
          return {
            kind: 'whitespace',
            message: 'Le nom de votre article ne doit pas être vide',
          };
        }
        return null;
      });

      required(schemaPath.quantity);
      min(schemaPath.quantity, 1);
      max(schemaPath.quantity, 99);
    },
    {
      submission: {
        action: async () => {
          const formValue = this.addModel();

          this.item.add(formValue.name, formValue.quantity).subscribe({
            next: () => {
              this.dialogRef.close(true);
              this.snackBar.open("L'article a été ajouté", 'Fermer', {
                duration: 3000,
                panelClass: ['snackbar-success'],
              });
            },
            error: (err) => {
              console.error(err);
              this.snackBar.open("L'article n'a pas pu être ajouté", 'Fermer', {
                duration: 3000,
                panelClass: ['snackbar-error'],
              });
            },
          });
        },
      },
    },
  );

  // Ma méthode pour annuler et revenir à la liste
  cancel() {
    this.dialogRef.close(true);
  }
}
