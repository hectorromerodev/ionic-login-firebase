import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {

  constructor(
    private authService: AuthService,
    private router: Router,

  ) { }

  async onResetPassword(email) {
    try {
      await this.authService.resentPassword(email.value);
      this.router.navigate(['login']);
    } catch (error) {
      console.error('Error --> ', error);
    }
  }

}
