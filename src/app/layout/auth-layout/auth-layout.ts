import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div style="height:100vh; display:flex; align-items:center; justify-content:center;">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AuthLayoutComponent {}
