import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { UsersFacade } from './facade/users.facade';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzCardModule,
    NzTagModule,
    NzInputModule,
    NzSelectModule
  ],
  templateUrl: './users.html',
})
export class UsersComponent implements OnInit {
  facade = inject(UsersFacade);

  searchValue = '';
  selectedRole: string | null = null;

  ngOnInit() {
    this.facade.loadUsers();
  }

  onSearch(value: string) {
    this.facade.search(value);
  }

  onRoleChange(role: string | null) {
    this.facade.filterRole(role);
  }

  getRoleColor(role: string) {
    return role === 'Admin' ? 'red' : 'blue';
  }
}