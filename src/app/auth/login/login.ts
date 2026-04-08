import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { authStore } from '../../core/auth/auth.store';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzGridModule,
    NzLayoutModule,
    NzIconModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.less'],
})
export class LoginComponent {

  form;
  passwordVisible = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private notification: NzNotificationService,
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { username, password } = this.form.value;

    this.loading = true;

    this.auth.login({ username: username!, password: password! }).subscribe({
      next: (res: any) => {
        authStore.login(res.user, res.token);
        this.router.navigate(['/dashboard']);
        this.notification.success('Success', 'Authenticated successfully');
      },
      error: () => {
        this.notification.error('Error', 'Invalid credentials');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}