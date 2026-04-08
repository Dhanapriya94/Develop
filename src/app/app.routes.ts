import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { authGuard } from './core/auth/auth.guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout';
import { DashboardLayout } from './layout/dashboard-layout/dashboard-layout';

export const routes: Routes = [

  // 🔁 Default redirect
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // 🔐 Auth Layout (No Guard)
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      }
    ]
  },

  // 🔒 Protected Dashboard Layout
  {
    path: '',
    component: DashboardLayout,
    canActivate: [authGuard],   // ✅ apply once here
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard')
            .then((m) => m.DashboardComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products')
            .then((m) => m.ProductsComponent),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./features/orders/orders')
            .then((m) => m.OrdersComponent),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/users/users')
            .then((m) => m.UsersComponent),
      }
    ]
  },

  // 🚫 Fallback
  {
    path: '**',
    redirectTo: 'login'
  }
];