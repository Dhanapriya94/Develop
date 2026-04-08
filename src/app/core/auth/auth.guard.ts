import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { authStore } from './auth.store';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  return authStore.isLoggedIn()
    ? true
    : router.createUrlTree(['/login']);
};