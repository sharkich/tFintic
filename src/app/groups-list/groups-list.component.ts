import {Component, OnInit} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {AuthService} from '../shared/auth.service';
import {Group} from '../shared/group';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {

  isLoading: boolean = true;
  groups$: FirebaseListObservable<Group[]>;
  sum: number;

  constructor(private angularFire: AngularFire, private authService: AuthService) {
  }

  ngOnInit() {
    this.groups$ = this.angularFire.database.list('/groups', {
      query: {
        orderByChild: 'ownerKey',
        equalTo: this.authService.getOwnerKey()
      }
    });
    this.groups$.subscribe((groups: Group[]) => {
      console.log('on', groups);
      this.sum = groups.reduce((sum, group: Group) => {
        return sum + group.sum;
      }, 0);
      this.isLoading = false;
    });
  }

}