import { Injectable } from '@angular/core';
import { of, throwError, delay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private isMockMode = true;

  login(payload: { username: string; password: string }) {

    if (this.isMockMode) {
      if (payload.username === 'admin' && payload.password === 'admin') {

        return of({
          user: { id: 1, role: 'ADMIN', name: 'Admin User' },
          token: 'mock-jwt-token-123'
        }).pipe(delay(800)); // simulate API delay

      } else {
        return throwError(() => ({ status: 401 }));
      }
    }

    return throwError(() => 'API not implemented');
  }
}