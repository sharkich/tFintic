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
          this.group = group;
          this.isLoading = false;
        });
    });
  }

  isNew(): boolean {
    return this.groupsService.isNew(this.group);
  }

  save() {
    this.groupsService.saveGroup(this.group);
    this.router.navigate(['/groups']);
    return false;
  }

  remove() {
    this.groupsService.deleteGroup(this.group);
    this.router.navigate(['/groups']);
    return false;
  }

}
