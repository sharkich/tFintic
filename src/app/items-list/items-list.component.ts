import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent {

  isLoading: boolean = true;
  items: FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire, private authService: AuthService) {
    this.items = angularFire.database.list('/items');
    this.items.subscribe((items) => {
      console.log('on', items);
      this.isLoading = false;
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  addItem(title: string, sum: number) {
    this.items.push({ title, sum });
  }
  updateItem(key: string, title: string, sum: number) {
    this.items.update(key, { title, sum });
  }
  deleteItem(key: string) {
    this.items.remove(key);
  }
  deleteEverything() {
    this.items.remove();
  }

}
