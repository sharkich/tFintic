import {Component, OnInit} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {AuthService} from '../shared/auth.service';
import {Log} from '../shared/log';

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.css']
})
export class LogsListComponent implements OnInit {

  isLoading: boolean = true;

  logs$: FirebaseListObservable<Log[]>;
  sum: number;

  currentMonth: string = '';

  constructor(private angularFire: AngularFire,
              private authService: AuthService) {
  }

  ngOnInit() {
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
        console.log('subscribe', logs);
        this.sum = logs.reduce((sum, log: Log) => {
          return sum + log.sum;
        }, 0);
        this.isLoading = false;
      });
  }

}
