import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {AuthService} from './auth.service';
import {Log} from './log';

@Injectable()
export class LogsService {

  private logs$: FirebaseListObservable<Log[]>;
  private logs: Log[];

  currentMonth: string = '';

  constructor(private angularFire: AngularFire,
              private authService: AuthService) {

    if (!this.authService.getOwnerKey()) {
      throw new Error('Log In please! Owner Key is not ready!!!! O_O');
    }

    let options;
    this.currentMonth = this.authService.getCurrentMonth();
    if (this.currentMonth) {
      options = {
        query: {
          orderByChild: 'mainKey',
          equalTo: `${this.authService.getOwnerKey()}#${this.currentMonth}`
        }
      };
    } else {
      options = {
        query: {
          orderByChild: 'ownerKey',
          equalTo: this.authService.getOwnerKey()
        }
      };
    }
    this.logs$ = this.angularFire.database.list('/logs', options);
  }

  getLogs(): Observable<Log[]> {
    let _do = (observer) => {
      observer.next(this.logs);
      observer.complete();
    };
    return Observable.create((observer) => {
      if (this.logs) {
        return _do(observer);
      }
      this.logs$.subscribe((logs: Log[]) => {
        this.logs = logs;
        _do(observer);
      });
    });
  }

  getLog(key: string): Observable<Log> {
    let _do = (observer) => {
      let log = this.logs.find((_log: Log) => {
        return _log.$key === key;
      });
      observer.next(log);
      if (log) {
        observer.complete();
      }
    };
    return Observable.create((observer) => {
      if (this.logs) {
        return _do(observer);
      }
      this.logs$.subscribe((logs: Log[]) => {
        this.logs = logs;
        return _do(observer);
      });
    });
  }

  getEmptyLog(): Log {
    let log = {
      $key: '',
      title: '',
      sum: 0,
      date: `${new Date().getFullYear()}-${('0' + (new Date().getMonth() + 1)).slice(-2)}-${('0' + new Date().getDate()).slice(-2)}`,
      groupKey: '',
      highlighting1: '',
      highlighting2: '',
      ownerKey: this.authService.getOwnerKey(),
      mainKey: ''
    };
    log = this.updateMainKey(log);
    return log;
  }

  updateMainKey(log: Log) {
    log.mainKey = `${this.authService.getOwnerKey()}#${log.date.slice(0, -3)}`;
    return log;
  }

  isNew(log: Log): boolean {
    return !log.$key;
  }

  saveLog(log: Log) {
    let _log = Object.assign({}, log);
    _log = this.updateMainKey(_log);
    let key = _log['$key'];
    delete _log['$key'];
    delete _log['$exists'];
    if (this.isNew(log)) {
      this.logs$.push(_log);
    } else {
      let log$ = this.angularFire.database.object(`/logs/${key}`);
      log$.update(_log);
    }
  }

  deleteLog(log: Log) {
    let log$ = this.angularFire.database.object(`/logs/${log.$key}`);
    log$.remove();
  }

}
