import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent {

  items: FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire, private authService: AuthService) {
    this.items = angularFire.database.list('/items');
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

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
