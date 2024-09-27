import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let localData;
  if (typeof window !== 'undefined' && localStorage) {
    localData = localStorage.getItem('loggedUser');
  }
  
  //const localData = localStorage?.getItem('loggedUser');
  if(localData!=null){
    return true;
  }
  else{
    router.navigate(['/signup-login']);
    return false;
  }
};
