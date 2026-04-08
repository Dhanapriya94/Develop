import { Injectable } from '@angular/core';
import { UsersStore } from '../store/users.store';

@Injectable({ providedIn: 'root' })
export class UsersFacade {
  private store = new UsersStore();

  users = this.store.users;
  loading = this.store.loading;

  loadUsers() {
    this.store.loadUsers();
  }

  search(value: string) {
    this.store.setSearch(value);
  }

  filterRole(role: string | null) {
    this.store.setRoleFilter(role);
  }
}