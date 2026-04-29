// Mon guard pour vérifier que les utilisateurs accédant à /list sont bien connectés
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const logGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  // Ce guard vérifie si l'utilisateur est connecté (true si connecté)
  if (auth.isLoggedIn()) {
    return true;
  }

  router.navigate(['/']);
  return false;
};