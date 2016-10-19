import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2';
import {AuthService} from '../shared/auth.service';
import {Log} from '../shared/log';

@Component({
  selector: 'app-log-edit',
  templateUrl: './log-edit.component.html',
  styleUrls: ['./log-edit.component.css']
})
export class LogEditComponent implements OnInit {

  isLoading: boolean = true;

  log$: FirebaseObjectObservable<Log>;
  logs$: FirebaseListObservable<Log[]>;

  log: Log;

  constructor(private angularFire: AngularFire,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      if (id === 'new') {
        this.logs$ = this.angularFire.database.list('/logs');
        this.log = {
          $key: '',
          title: '',
          sum: 0,
          date: new Date().toISOString(),
          groupKey: '',
          ownerKey: this.authService.getOwnerKey()
        };
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
        ownerKey: this.authService.getOwnerKey()
      });
    } else {
      console.log('update', this.log);
      this.log$.update({
        title: this.log.title,
        sum: this.log.sum,
        date: this.log.date,
        groupKey: this.log.groupKey,
        ownerKey: this.authService.getOwnerKey()
      });
    }
    this.router.navigate(['/logs']);
  }

}
