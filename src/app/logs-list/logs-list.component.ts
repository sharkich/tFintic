import { Component, OnInit } from '@angular/core';
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

  constructor(private angularFire: AngularFire,
              private authService: AuthService) {}

  ngOnInit() {
    this.logs$ = this.angularFire.database.list('/logs', {
      query: {
        orderByChild: 'ownerKey',
        equalTo: this.authService.getOwnerKey()
      }
    });
    this.logs$.subscribe((logs: Log[]) => {
      console.log('on', logs);
      this.sum = logs.reduce((sum, log: Log) => {
        return sum + log.sum;
      }, 0);
      this.isLoading = false;
    });
  }

}
