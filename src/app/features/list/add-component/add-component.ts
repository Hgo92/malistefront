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
    name: '',
    quantity: 1,
  });
  
  private readonly router = inject(Router);
  private readonly itemService = inject(ItemService); // Renommé pour plus de clarté
  private readonly dialogRef = inject(MatDialogRef<AddComponent>);

  addForm = form(
    this.addModel,
    (schemaPath) => {
      required(schemaPath.name, { message: "Un nom est nécessaire" });
      minLength(schemaPath.name, 2);
      required(schemaPath.quantity);
      min(schemaPath.quantity, 1, { message: "Il faut au moins un article" });
      max(schemaPath.quantity, 99, { message: "C'est un peu trop d'articles" });
    },
    {
      submission: {
        action: async () => {
          // On récupère les valeurs actuelles des signaux du formulaire
          const name = this.addForm.name().value();
          const quantity = this.addForm.quantity().value();

          // Appel au service avec .subscribe() pour déclencher la requête HTTP
          this.itemService.add(name, quantity).subscribe({
            next: (response) => {
              console.log('Succès:', response);
              this.dialogRef.close(true); // Ferme la modale en cas de succès
            },
            error: (err) => {
              console.error('Erreur lors de l\'ajout:', err);
              // L'erreur "JSON parse error" du backend sera captée ici si la quantité est nulle
            }
          });
        }
      }
    }
  );

  cancel() {
    this.dialogRef.close(); // Plus propre pour une modale que de naviguer directement
  }
}