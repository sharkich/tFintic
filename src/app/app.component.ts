import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseAuthState } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  auth: FirebaseAuthState;
  items: FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire) {
    this.items = angularFire.database.list('/items');
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

  // items

  addItem(newName: string) {
    this.items.push({ text: newName });
  }
  updateItem(key: string, newText: string) {
    this.items.update(key, { text: newText });
  }
  deleteItem(key: string) {
    this.items.remove(key);
  }
  deleteEverything() {
    this.items.remove();
  }
}
