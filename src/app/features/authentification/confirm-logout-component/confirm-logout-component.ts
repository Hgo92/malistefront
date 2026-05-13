import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Auth } from '../services/auth';
import { MatDialogActions, MatDialogClose, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-logout-component',
  imports: [MatDialogClose, MatDialogActions],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './confirm-logout-component.html',
  styleUrl: './confirm-logout-component.scss',
})
export class ConfirmLogoutComponent {
  private readonly auth = inject(Auth);
  private readonly dialogRef = inject(MatDialogRef<ConfirmLogoutComponent>);
  protected showLogOut = false;

  // Ma méthode pour me déconnecter
  onLogout() {
    this.showLogOut = true;
    this.dialogRef.updateSize('auto', 'auto');

    setTimeout(() => {
      this.auth.logout();
      this.dialogRef.close(true);
      this.showLogOut = false;
    }, 2000);
  }
}
