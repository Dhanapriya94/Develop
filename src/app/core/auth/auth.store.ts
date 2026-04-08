import { signal, computed } from '@angular/core';

const _token = signal<string | null>(localStorage.getItem('token'));
const _user = signal<any | null>(JSON.parse(localStorage.getItem('user') || 'null'));

export const authStore = {
  token: computed(() => _token()),
  user: computed(() => _user()),
  isLoggedIn: computed(() => !!_token()),

  login(user: any, token: string) {
    _user.set(user);
    _token.set(token);

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  logout() {
    _user.set(null);
    _token.set(null);

    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};