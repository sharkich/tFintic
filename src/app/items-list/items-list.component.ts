import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit{

  isLoading: boolean = true;
  items: FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire,
              private router: Router) {
  }

  ngOnInit() {
    this.items = this.angularFire.database.list('/items');
    this.items.subscribe((items) => {
      console.log('on', items);
      this.isLoading = false;
    });
  }

  addItem(title: string, sum: number) {
    this.items.push({ title, sum });
  }
  deleteItem(key: string) {
    this.items.remove(key);
  }

  deleteEverything() {
    this.items.remove();
  }

  onClickItem(item) {
    this.router.navigate(['/items', item.$key]);
  }

}
