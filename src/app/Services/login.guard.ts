import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loggedUser = localStorage.getItem('loggedUser');
  if (loggedUser) {
    router.navigate(['/products']);
    return false; 
  }
  return true; 
};
