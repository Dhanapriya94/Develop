import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzTagModule, NzCardModule, NzButtonModule],
  templateUrl: './orders.html',
})
export class OrdersComponent {
  orders = [
    { id: 1, customer: 'John', amount: 500, status: 'Delivered' },
    { id: 2, customer: 'Jane', amount: 1200, status: 'Pending' },
    { id: 3, customer: 'David', amount: 800, status: 'Shipped' },
  ];

  getStatusColor(status: string) {
    switch (status) {
      case 'Delivered':
        return 'green';
      case 'Pending':
        return 'orange';
      case 'Shipped':
        return 'blue';
      default:
        return 'default';
    }
  }
}
