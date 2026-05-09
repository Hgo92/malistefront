import { Component, signal, inject } from '@angular/core';
import { ItemService } from '../services/item';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { form, FormField, FormRoot, required, minLength, min, max } from '@angular/forms/signals';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';


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
  private readonly http = inject(HttpClient);
  
  constructor() {
    this.http.post(
  'https://malisteback.zapto.org/api/items/add',
  { name: 'test', quantity: 1 }
).subscribe({
  next: res => console.log(res),
  error: err => console.error(err)
});
  }

  addForm = form(
    this.addModel,
    (schemaPath) => {
      required(schemaPath.name);    
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
