import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzGridModule, NzIconModule],
  templateUrl: './dashboard.html'
})
export class DashboardComponent {

  stats = [
    { title: 'Total Sales', value: '$12,000' },
    { title: 'Orders', value: '320' },
    { title: 'Users', value: '150' },
    { title: 'Products', value: '80' }
  ];

}