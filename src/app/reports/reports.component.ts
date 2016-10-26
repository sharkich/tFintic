import {Component, OnInit} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {AuthService} from '../shared/auth.service';
import {Group} from '../shared/group';
import {Log} from '../shared/log';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  isLoading: boolean = true;

  currentMonth: string = '';

  groups$: FirebaseListObservable<Group[]>;
  logs$: FirebaseListObservable<Log[]>;

  sum: number;

  constructor(private angularFire: AngularFire,
              private authService: AuthService) { }

  ngOnInit() {
    this.groups$ = this.angularFire.database.list('/groups', {
      query: {
        orderByChild: 'ownerKey',
        equalTo: this.authService.getOwnerKey()
      }
    });
    this.groups$.subscribe((groups: Group[]) => {
      console.log('groups$', groups);
      this.sum = groups.reduce((sum, group: Group) => {
        return sum + group.sum;
      }, 0);
      console.log('this.sum', this.sum);
      this.isLoading = false;
    });

    let options;
    this.currentMonth = this.authService.getCurrentMonth();
    if (this.currentMonth) {
      options = {
        query: {
          orderByChild: 'mainKey',
          equalTo: `${this.authService.getOwnerKey()}#${this.currentMonth}`
        }
      };
    }
    console.log(`${this.authService.getOwnerKey()}#${this.currentMonth}`);
    this.logs$ = this.angularFire.database.list('/logs', options);
    this.logs$
      .subscribe((logs: Log[]) => {
        console.log('logs$', logs);
        this.sum = logs.reduce((sum, log: Log) => {
          return sum + log.sum;
        }, 0);
        this.isLoading = false;
      });
  }

}
