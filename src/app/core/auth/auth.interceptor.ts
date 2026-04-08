import { HttpInterceptorFn } from '@angular/common/http';
import { authStore } from './auth.store';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = authStore.token();
  const router = inject(Router);

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error) => {

      if (error.status === 401) {
        authStore.logout();
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};