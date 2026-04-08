import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzTagModule,
    NzCardModule,
    NzButtonModule,
    NzSelectModule,
    NzDrawerModule,
    NzIconModule,
    NzTooltipModule
  ],
  templateUrl: './orders.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent {

  // 🔥 BASE DATA
  private _orders = signal([
    { id: 1, customer: 'John', amount: 500, status: 'Delivered' },
    { id: 2, customer: 'Jane', amount: 1200, status: 'Pending' },
    { id: 3, customer: 'David', amount: 800, status: 'Shipped' },
    { id: 4, customer: 'Arun', amount: 1500, status: 'Pending' }
  ]);

  // 🔹 STATE
  search = signal('');
  statusFilter = signal<'All' | 'Pending' | 'Shipped' | 'Delivered'>('All');

  selectedOrder = signal<any | null>(null);
  drawerVisible = signal(false);

  // 🔥 FILTERED DATA
  orders = computed(() => {
    let data = this._orders();

    const term = this.search().toLowerCase();
    if (term) {
      data = data.filter(o =>
        o.customer.toLowerCase().includes(term) ||
        o.id.toString().includes(term)
      );
    }

    if (this.statusFilter() !== 'All') {
      data = data.filter(o => o.status === this.statusFilter());
    }

    return data;
  });

  // 🎨 COLORS
  statusColorMap: Record<string, string> = {
    Delivered: 'green',
    Pending: 'orange',
    Shipped: 'blue'
  };

  // 🔄 UPDATE STATUS
  updateStatus(order: any, newStatus: string) {
    this._orders.set(
      this._orders().map(o =>
        o.id === order.id ? { ...o, status: newStatus } : o
      )
    );
  }

  // 🔍 SEARCH
  onSearch(event: Event) {
    this.search.set((event.target as HTMLInputElement).value);
  }

  onStatusFilterChange(value: any) {
    this.statusFilter.set(value);
  }

  trackById(index: number, item: any) {
    return item.id;
  }

  // 🔥 OPEN DRAWER
  openOrder(order: any) {
    this.selectedOrder.set(order);
    this.drawerVisible.set(true);
  }

  closeDrawer() {
    this.drawerVisible.set(false);
  }
}