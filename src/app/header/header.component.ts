import {Component} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private angularFire: AngularFire, private authService: AuthService) {
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

}
