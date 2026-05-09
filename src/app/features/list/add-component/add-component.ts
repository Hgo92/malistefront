import { Component, signal, inject } from '@angular/core';
import { ItemService } from '../services/item';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { form, FormField, FormRoot, required, minLength, min, max } from '@angular/forms/signals';
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

  addForm = form(
    this.addModel,
    (schemaPath) => {
      required(schemaPath.name);    
      required(schemaPath.quantity);
    },
    {
      submission : {
        action: async () => {
          console.log('name:', this.addForm.name().value());
          console.log('quantity:', this.addForm.quantity().value());
          console.log(this.addForm.name().errors());
          console.log(this.addForm.quantity().errors());
          console.log('Avant HTTP call'); 
            
          this.item.add(
  this.addForm.name().value(),
  this.addForm.quantity().value()
).subscribe({
  next: (res) => {
    console.log('SUCCESS', res);
    this.dialogRef.close(true);
  },
  error: (err) => {
    console.error('ERROR', err);
  },
  complete: () => {
    console.log('COMPLETE');
  }
});
            
          console.log('Après HTTP call'); 
          this.dialogRef.close(true);
          return;
      }
      }
    }
  );

  // Ma méthode pour annuler et revenir à la liste
  cancel() {
    this.router.navigate(['/list'])
  }
}
