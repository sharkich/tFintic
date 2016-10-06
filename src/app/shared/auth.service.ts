import { Injectable } from '@angular/core';

import { AngularFire, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class AuthService {

  auth: FirebaseAuthState;

  constructor(private angularFire: AngularFire) {
    this.angularFire.auth.subscribe((auth) => {
      this.auth = auth;
    });
  }

  isLoggedIn(): boolean {
    return !!(this.auth && this.auth.uid);
  }

  login() {
    return this.angularFire.auth.login();
  }

  logout() {
    return this.angularFire.auth.logout();
  }

  get user() {
    return this.auth;
  }

}
