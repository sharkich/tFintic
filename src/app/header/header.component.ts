import { Component } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  auth: FirebaseAuthState;

  constructor(private angularFire: AngularFire) {
    this.angularFire.auth.subscribe((auth) => {
      this.auth = auth;
    });
  }

  // auth

  isAuth(): boolean {
    return !!(this.auth && this.auth.uid);
  }

  login() {
    this.angularFire.auth.login();
  }

  logout() {
    this.angularFire.auth.logout();
  }

}
