import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products/products').then(m => m.ProductsComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then(m => m.DashboardComponent)
  },
  {
  path: 'orders',
  loadComponent: () =>
    import('./pages/orders/orders').then(m => m.OrdersComponent)
},
{
  path: 'users',
  loadComponent: () =>
    import('./pages/users/users').then(m => m.UsersComponent)
},
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];