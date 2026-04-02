import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNzI18n, en_US } from 'ng-zorro-antd/i18n';
import { provideNzIcons } from 'ng-zorro-antd/icon';

// ✅ ICONS YOU WANT
import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  AppstoreOutline,
  ShoppingCartOutline,
  UserOutline
} from '@ant-design/icons-angular/icons';

// ✅ REGISTER ICONS
const icons = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  AppstoreOutline,
  ShoppingCartOutline,
  UserOutline
];
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
        provideNzI18n(en_US),
        provideNzIcons(icons)  // ✅ GLOBAL FIX

  ]
};
