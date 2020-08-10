import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserI } from '../shared/interfaces/user.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {
  user$: Observable<UserI> = this.authService.user$;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
