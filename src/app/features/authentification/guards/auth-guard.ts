import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = () => {
  const authService = inject(Auth);
  const router = inject(Router);

  // Ce guard vérifie si l'utilisateur est connecté (false si connecté)
  if (authService.getToken()) {
    router.navigate(['/list']);
    return false;
  }
  return true;
};
