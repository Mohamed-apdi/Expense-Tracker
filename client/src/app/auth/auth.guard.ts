import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const token = localStorage.getItem('token');


  if(token){
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000 < Date.now();
      if (!exp) {
        return true;
      }
  }
  router.navigate(['/login']);
  return false;
};
