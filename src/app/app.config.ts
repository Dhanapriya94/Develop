import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNzI18n, en_US } from 'ng-zorro-antd/i18n';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/auth/auth.interceptor';
import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  AppstoreOutline,
  ShoppingCartOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';
// 🔥 ADD THESE
import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';

// chart types
import { LineChart, PieChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';

// renderer
import { CanvasRenderer } from 'echarts/renderers';

// register charts
echarts.use([
  LineChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer
]);
const icons = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  AppstoreOutline,
  ShoppingCartOutline,
  UserOutline,
];
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideNzI18n(en_US),
    provideNzIcons(icons),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideEchartsCore({ echarts })
  ],
};
