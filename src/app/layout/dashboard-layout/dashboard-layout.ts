import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { authStore } from '../../core/auth/auth.store';
@Component({
  selector: 'app-dashboard-layout',
  imports: [
    RouterOutlet,
    RouterModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzDropDownModule,
    NzSpaceModule,
    NzGridModule,
  ],
  templateUrl: './dashboard-layout.html',
})
export class DashboardLayout {
  isCollapsed = false;
  constructor(private router: Router) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  logout() {
    authStore.logout();
  this.router.navigate(['/login']);
  }
}
