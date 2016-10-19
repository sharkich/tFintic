import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2';
import {AuthService} from '../shared/auth.service';
import {Group} from '../shared/group';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {

  isLoading: boolean = true;

  group$: FirebaseObjectObservable<Group>;
  groups$: FirebaseListObservable<Group[]>;

  group: Group;

  constructor(private angularFire: AngularFire,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {}

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      if (id === 'new') {
        this.groups$ = this.angularFire.database.list('/groups');
        this.group = {
          $key: '',
          title: '',
          sum: 0,
          ownerKey: this.authService.getOwnerKey()
        };
        this.isLoading = false;
        return;
      }
      this.group$ = this.angularFire.database.object(`/groups/${id}`);
      this.group$.subscribe((item: Group) => {
        console.log('on', item);
        this.group = item;
        this.isLoading = false;
      });
    });
  }

  isNew(): boolean {
    return !this.group.$key;
  }

  save() {
    if (this.isNew()) {
      console.log('push', this.group);
      this.groups$.push({
        title: this.group.title,
        sum: this.group.sum,
        ownerKey: this.authService.getOwnerKey()
      });
    } else {
      console.log('update', this.group);
      this.group$.update({
        title: this.group.title,
        sum: this.group.sum,
        ownerKey: this.authService.getOwnerKey()
      });
    }
    this.router.navigate(['/groups']);
  }

}
