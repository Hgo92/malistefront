import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-confirm-logout-component',
  imports: [MatDialogModule],
  templateUrl: './confirm-logout-component.html',
  styleUrl: './confirm-logout-component.scss',
})

export class ConfirmLogoutComponent implements OnInit {
  private readonly auth = inject(Auth);
  private readonly dialogRef = inject(MatDialogRef<ConfirmLogoutComponent>)
  public showLogOut = false;

  ngOnInit(): void {
    this.dialogRef.updateSize('auto', 'auto');
  }
  // Ma méthode pour me déconnecter
  onLogout() {
    this.showLogOut = true;
    this.dialogRef.updateSize('auto', 'auto');
    
    setTimeout(() => {
        this.showLogOut = false;
        this.auth.logout();
        this.dialogRef.close(true);
      }, 2000);
    }

}
