import {Component, OnInit} from '@angular/core';
import {GroupsService} from '../shared/groups.service';
import {Group} from '../shared/group';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {

  isLoading: boolean = true;

  groups: Group[] = [];

  sum: number;

  constructor(private groupsService: GroupsService) {
  }

  ngOnInit() {
    this.groupsService.getGroups()
      .subscribe((groups: Group[]) => {
        this.groups = groups;
        this.sum = groups.reduce((sum, group: Group) => {
          return sum + group.sum;
        }, 0);
        this.isLoading = false;
      });
  }

}
