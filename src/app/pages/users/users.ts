import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzCardModule, NzTagModule],
  templateUrl: './users.html',
})
export class UsersComponent {
  users = [
    { id: 1, name: 'John', email: 'john@mail.com', role: 'Admin' },
    { id: 2, name: 'Jane', email: 'jane@mail.com', role: 'Customer' },
    { id: 3, name: 'David', email: 'david@mail.com', role: 'Customer' },
  ];

  getRoleColor(role: string) {
    return role === 'Admin' ? 'red' : 'blue';
  }
}
