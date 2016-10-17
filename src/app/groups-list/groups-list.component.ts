import {Component, OnInit} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

import {Group} from '../shared/group';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {

  isLoading: boolean = true;
  groups: FirebaseListObservable<Group[]>;

  constructor(private angularFire: AngularFire) {
  }

  ngOnInit() {
    this.groups = this.angularFire.database.list('/groups');
    this.groups.subscribe((groups: Group[]) => {
      console.log('on', groups);
      this.isLoading = false;
    });
  }

}
