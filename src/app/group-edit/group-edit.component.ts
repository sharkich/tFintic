import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GroupsService} from '../shared/groups.service';
import {Group} from '../shared/group';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {

  isLoading: boolean = true;

  group: Group = this.groupsService.getEmptyGroup();

  constructor(private groupsService: GroupsService,
              private route: ActivatedRoute,
              private router: Router) {
    console.log(this.group);
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let key = params['id'];
      if (key === 'new') {
        this.isLoading = false;
        return;
      }
      this.groupsService.getGroup(key)
        .subscribe((group: Group) => {
          console.log('on', group);
          this.group = group;
          this.isLoading = false;
        });
    });
  }

  isNew(): boolean {
    return !this.group.$key;
  }

  save() {
    // if (this.isNew()) {
    //   console.log('push', this.group);
    //   this.groups$.push({
    //     title: this.group.title,
    //     sum: this.group.sum,
    //     highlighting: this.group.highlighting,
    //     ownerKey: this.authService.getOwnerKey()
    //   });
    // } else {
    //   console.log('update', this.group);
    //   this.group$.update({
    //     title: this.group.title,
    //     sum: this.group.sum,
    //     highlighting: this.group.highlighting,
    //     ownerKey: this.authService.getOwnerKey()
    //   });
    // }
    this.router.navigate(['/groups']);
  }

}
