import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,

  ) { }

  ngOnInit() {
  }

  async onRegister(email, password) {
    try {
      const user = await this.authService.register(email.value, password.value);
      if (user) {
        const isVerify = this.authService.isEmailVerified(user);
        this.redirectUser(isVerify);
      }
    } catch (error) {
      console.error('Error --> ', error);
    }
  }
  private redirectUser(isVerified: boolean) {
    /// redirect --> admin
    if (isVerified) {
      this.router.navigate(['admin']);
    } else {
      this.router.navigate(['verify-email']);
    }
  }
}
