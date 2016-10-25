import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2';
import {AuthService} from '../shared/auth.service';
import {Log} from '../shared/log';
import {Group} from '../shared/group';

@Component({
  selector: 'app-log-edit',
  templateUrl: './log-edit.component.html',
  styleUrls: ['./log-edit.component.css']
})
export class LogEditComponent implements OnInit {

  isLoading: boolean = true;

  groups$: FirebaseListObservable<Group[]>;

  log$: FirebaseObjectObservable<Log>;
  logs$: FirebaseListObservable<Log[]>;

  log: Log = {
    $key: '',
    title: '',
    sum: 0,
    date: `${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(-2)}-${('0' + new Date().getDate()).slice(-2)}`,
    groupKey: '',
    highlighting1: '',
    highlighting2: '',
    ownerKey: this.authService.getOwnerKey()
  };

  constructor(private angularFire: AngularFire,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {

    this.route.params.forEach((params: Params) => {
      let id = params['id'];

      if (id === 'new') {
        this.logs$ = this.angularFire.database.list('/logs');
        this.isLoading = false;
        return;
      }

      this.log$ = this.angularFire.database.object(`/logs/${id}`);
      this.log$.subscribe((item: Log) => {
        console.log('on', item);
        this.log = item;
        this.isLoading = false;
      });

    });

    this.groups$ = this.angularFire.database.list('/groups', {
      query: {
        orderByChild: 'ownerKey',
        equalTo: this.authService.getOwnerKey()
      }
    });
  }

  isNew(): boolean {
    return !this.log.$key;
  }

  save() {
    if (this.isNew()) {
      console.log('push', this.log);
      this.logs$.push({
        title: this.log.title,
        sum: this.log.sum,
        date: this.log.date,
        groupKey: this.log.groupKey,
        highlighting1: this.log.highlighting1,
        highlighting2: this.log.highlighting2,
        ownerKey: this.authService.getOwnerKey()
      });
    } else {
      console.log('update', this.log);
      this.log$.update({
        title: this.log.title,
        sum: this.log.sum,
        date: this.log.date,
        groupKey: this.log.groupKey,
        highlighting1: this.log.highlighting1,
        highlighting2: this.log.highlighting2,
        ownerKey: this.authService.getOwnerKey()
      });
    }
    this.router.navigate(['/logs']);
  }

  changeGroup(groupKey: string) {
    this.log.groupKey = groupKey;

    this.groups$.subscribe((groups: Group[]) => {
      let group: Group = groups.filter(gr => gr.$key === groupKey)[0];
      if (group) {
        this.log.highlighting1 = group.highlighting;
      }
    });
  }

}
