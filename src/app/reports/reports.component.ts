import {Component, OnInit} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {AuthService} from '../shared/auth.service';
import {Group} from '../shared/group';
import {Log} from '../shared/log';

import {GroupStatistic} from '../shared/reports';

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

  groupsStatistics = {};

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
      groups.forEach((group: Group) => {
        let groupStatistic: GroupStatistic = {
          group,
          logsSum: 0,
          logs: []
        };
        this.groupsStatistics[group.$key] = groupStatistic;
      });
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

        logs.forEach((log: Log) => {
          let groupsStatistic: GroupStatistic = this.groupsStatistics[log.groupKey];
          groupsStatistic.logsSum += log.sum;
          groupsStatistic.logs.push(log);
        });

        this.isLoading = false;
      });
  }

}
