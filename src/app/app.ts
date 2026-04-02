import { Component } from '@angular/core';
import { RouterOutlet, RouterModule,Router } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule, NzLayoutModule, NzMenuModule, NzIconModule],

 template: `
<nz-layout class="app-layout">

  <!-- HEADER (TOP FULL WIDTH) -->
  <nz-header class="header">

    <div style="display:flex; align-items:center; gap:15px;">

      <!-- TOGGLE BUTTON -->
      <span
        (click)="toggleSidebar()"
        style="font-size:20px; cursor:pointer;"
      >
        ☰
      </span>

      <h3 style="margin:0;"><div class="logo">E-Commerce Admin</div></h3>

    </div>

  </nz-header>

  <!-- BELOW HEADER -->
  <nz-layout>

    <!-- SIDEBAR -->
    <nz-sider
      nzCollapsible
      [nzCollapsed]="isCollapsed"
      [nzCollapsedWidth]="0"
      [nzWidth]="isCollapsed ? 0 : 300"
      [nzTrigger]="null"
    >

      <ul nz-menu nzTheme="dark" nzMode="inline">

  <li
    nz-menu-item
    routerLink="/dashboard"
    routerLinkActive="ant-menu-item-selected"
    #dash="routerLinkActive"
    [nzSelected]="dash.isActive"
  >
    <span nz-icon nzType="dashboard"></span>
    <span>Dashboard</span>
  </li>

  <li
    nz-menu-item
    routerLink="/products"
    routerLinkActive="ant-menu-item-selected"
    #prod="routerLinkActive"
    [nzSelected]="prod.isActive"
  >
    <span nz-icon nzType="appstore"></span>
    <span>Products</span>
  </li>

  <li
    nz-menu-item
    routerLink="/orders"
    routerLinkActive="ant-menu-item-selected"
    #order="routerLinkActive"
    [nzSelected]="order.isActive"
  >
    <span nz-icon nzType="shopping-cart"></span>
    <span>Orders</span>
  </li>

  <li
    nz-menu-item
    routerLink="/users"
    routerLinkActive="ant-menu-item-selected"
    #user="routerLinkActive"
    [nzSelected]="user.isActive"
  >
    <span nz-icon nzType="user"></span>
    <span>Users</span>
  </li>

</ul>

    </nz-sider>

    <!-- CONTENT -->
    <nz-content class="content">
      <router-outlet></router-outlet>
    </nz-content>

  </nz-layout>

</nz-layout>
`
})
export class App {
  isCollapsed = false;
constructor(private router: Router) {}

toggleSidebar() {
  this.isCollapsed = !this.isCollapsed;
}

isActive(path: string): boolean {
  return this.router.url === path;
}
}