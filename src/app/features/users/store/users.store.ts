import { signal, computed } from '@angular/core';
import { User } from '../models/user.model';

export class UsersStore {
  private _users = signal<User[]>([]);
  private _loading = signal(false);
  private _search = signal('');
  private _roleFilter = signal<string | null>(null);

  users = computed(() => {
    let data = this._users();

    if (this._search()) {
      data = data.filter(u =>
        u.name.toLowerCase().includes(this._search().toLowerCase()) ||
        u.email.toLowerCase().includes(this._search().toLowerCase())
      );
    }

    if (this._roleFilter()) {
      data = data.filter(u => u.role === this._roleFilter());
    }

    return data;
  });

  loading = computed(() => this._loading());

  loadUsers() {
    this._loading.set(true);

    // simulate API
    setTimeout(() => {
      this._users.set([
        { id: 1, name: 'John', email: 'john@mail.com', role: 'Admin', status: 'Active' },
        { id: 2, name: 'Jane', email: 'jane@mail.com', role: 'Customer', status: 'Inactive' },
        { id: 3, name: 'David', email: 'david@mail.com', role: 'Customer', status: 'Active' },
      ]);

      this._loading.set(false);
    }, 1000);
  }

  setSearch(value: string) {
    this._search.set(value);
  }

  setRoleFilter(role: string | null) {
    this._roleFilter.set(role);
  }
}