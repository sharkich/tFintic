import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2';

import {Group} from '../shared/group';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {

  isLoading: boolean = true;

  item$: FirebaseObjectObservable<Group>;
  items$: FirebaseListObservable<Group[]>;

  item: Group;

  constructor(private angularFire: AngularFire,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      if (id === 'new') {
        this.items$ = this.angularFire.database.list('/groups');
        this.item = {
          $key: '',
          title: '',
          sum: 0
        };
        this.isLoading = false;
        return;
      }
      this.item$ = this.angularFire.database.object(`/groups/${id}`);
      this.item$.subscribe((item: Group) => {
        console.log('on', item);
        this.item = item;
        this.isLoading = false;
      });
    });
  }

  isNew(): boolean {
    return !this.item.$key;
  }

  save() {
    if (this.isNew()) {
      console.log('push', this.item);
      this.items$.push({
        title: this.item.title,
        sum: this.item.sum});
    } else {
      console.log('update', this.item);
      this.item$.update({
        title: this.item.title,
        sum: this.item.sum});
    }
    this.router.navigate(['/groups']);
  }

}
