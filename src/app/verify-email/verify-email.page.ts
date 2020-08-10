import { Component, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserI } from '../shared/interfaces/user.interface';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnDestroy {
  user$: Observable<UserI> = this.afAuth.user;
  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth,

  ) { }

  async onSendEmail(): Promise<void> {
    try {
      await this.authService.sendVerificationEmail();
    } catch (error) {
      console.error('Error --> ', error);
    }
  }

  ngOnDestroy(): void {
    this.authService.logout();
  }

}
