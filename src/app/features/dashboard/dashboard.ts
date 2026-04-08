import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzGridModule,
    NzTableModule,
    NzSkeletonModule,
    NzSegmentedModule,
    NgxEchartsModule,
    FormsModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.less']
})
export class DashboardComponent {

  // 🔹 FILTER STATE
  filter = signal<'today' | 'week' | 'month'>('today');

  // 🔹 LOADING
  private _loading = signal(true);
  loading = computed(() => this._loading());

  // 🔹 BASE DATA (mock)
  private baseStats = {
    today: [
      { title: 'Revenue', value: '₹10,000' },
      { title: 'Orders', value: '25' },
      { title: 'Customers', value: '80' },
      { title: 'Products', value: '85' }
    ],
    week: [
      { title: 'Revenue', value: '₹70,000' },
      { title: 'Orders', value: '180' },
      { title: 'Customers', value: '450' },
      { title: 'Products', value: '85' }
    ],
    month: [
      { title: 'Revenue', value: '₹1,25,000' },
      { title: 'Orders', value: '320' },
      { title: 'Customers', value: '1200' },
      { title: 'Products', value: '85' }
    ]
  };

  // 🔥 STATS (Reactive)
  stats = computed(() => this.baseStats[this.filter()]);

  // 🔹 CHART (Reactive)
  salesChart = computed(() => {
    const dataMap: any = {
      today: [500, 800, 600, 900, 1200, 1500, 1300],
      week: [1200, 2000, 1500, 3000, 2500, 4000, 3500],
      month: [3000, 5000, 4500, 7000, 6500, 9000, 8500]
    };

    return {
      xAxis: { type: 'category', data: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
      yAxis: { type: 'value' },
      series: [{
        data: dataMap[this.filter()],
        type: 'line',
        smooth: true
      }]
    };
  });

  // 🔹 PIE (static)
  categoryChart = {
    series: [{
      type: 'pie',
      radius: '70%',
      data: [
        { value: 40, name: 'Electronics' },
        { value: 25, name: 'Fashion' },
        { value: 20, name: 'Home' },
        { value: 15, name: 'Other' }
      ]
    }]
  };

  // 🔹 ORDERS
  private _orders = signal<any[]>([]);
  orders = computed(() => this._orders());

  constructor() {
    this.loadDashboard();
  }

  // 🔥 SIMULATED API
  loadDashboard() {
    this._loading.set(true);

    setTimeout(() => {
      this._orders.set([
        { id: 1, user: 'John', amount: 5000, status: 'Delivered' },
        { id: 2, user: 'Priya', amount: 3000, status: 'Pending' },
        { id: 3, user: 'Rahul', amount: 7000, status: 'Shipped' }
      ]);

      this._loading.set(false);
    }, 1200);
  }
  onFilterChange(value: 'today' | 'week' | 'month') {
  this.filter.set(value);
}
}