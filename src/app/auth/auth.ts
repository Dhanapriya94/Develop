import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth$ = new BehaviorSubject<boolean>(false);

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('auth', 'true');
      return true;
    }
    return false;
  }

  logout() {
    this.auth$.next(false);
    localStorage.removeItem('auth');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('auth') === 'true';
  }
}
