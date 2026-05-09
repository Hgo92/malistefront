import { Component, signal, inject } from '@angular/core';
import { ItemService } from '../services/item';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { form, FormField, FormRoot, required, minLength, min, max } from '@angular/forms/signals';


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

  addForm = form(
    this.addModel,
    (schemaPath) => {
      required(schemaPath.name, {message : "Un nom est nécessaire"});
      minLength(schemaPath.name, 2);
      required(schemaPath.quantity);
      min(schemaPath.quantity, 1, {message : "Il faut au moins un article"})
      max(schemaPath.quantity, 99, {message : "C'est un peu trop d'articles"})
    },
    {
      submission : {
        action: async () => {
          
          try {
              this.item.add(this.addForm.name().value(), this.addForm.quantity().value())
            
            this.dialogRef.close(true)
            return;
          } catch (error) {
            return { kind : 'serverError', message: "L'inscription n'a pas fonctionné"}
          }
        }
      }
    }
  );

  // Ma méthode pour annuler et revenir à la liste
  cancel() {
    this.router.navigate(['/list'])
  }
}
