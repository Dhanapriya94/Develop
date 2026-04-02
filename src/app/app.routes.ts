import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { authGuard } from './auth/auth-guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout';
import { DashboardLayout } from './layout/dashboard-layout/dashboard-layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: '',
    component: DashboardLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard').then((m) => m.DashboardComponent),
      },
      {
        path: 'products',
        loadComponent: () => import('./pages/products/products').then((m) => m.ProductsComponent),
      },
      {
        path: 'orders',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/orders/orders').then((m) => m.OrdersComponent),
      },
      {
        path: 'users',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/users/users').then((m) => m.UsersComponent),
      },
    ],
  },
];
