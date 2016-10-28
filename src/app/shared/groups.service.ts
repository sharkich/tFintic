import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {AuthService} from './auth.service';
import {Group} from './group';

@Injectable()
export class GroupsService {

  private groups$: FirebaseListObservable<Group[]>;
  private groups: Group[];

  constructor(private angularFire: AngularFire,
              private authService: AuthService) {

    if (!this.authService.getOwnerKey()) {
      throw new Error('Log In please! Owner Key is not ready!!!! O_O');
    }
    this.groups$ = this.angularFire.database.list('/groups', {
      query: {
        orderByChild: 'ownerKey',
        equalTo: this.authService.getOwnerKey()
      }
    });
  }

  getGroups(): Observable<Group[]> {
    let _do = (observer) => {
      observer.next(this.groups);
      observer.complete();
    };
    return Observable.create((observer) => {
      if (this.groups) {
        return _do(observer);
      }
      this.groups$.subscribe((groups: Group[]) => {
        this.groups = groups;
        _do(observer);
      });
    });
  }

  getGroup(key: string): Observable<Group> {
    let _do = (observer) => {
      let group = this.groups.find((_group: Group) => {
        return _group.$key === key;
      });
      observer.next(group);
      if (group) {
        observer.complete();
      }
    };
    return Observable.create((observer) => {
      if (this.groups) {
        return _do(observer);
      }
      this.groups$.subscribe((groups: Group[]) => {
        this.groups = groups;
        return _do(observer);
      });
    });
  }

  getEmptyGroup(): Group {
    return {
      $key: '',
      title: '',
      sum: 0,
      highlighting: '',
      ownerKey: this.authService.getOwnerKey()
    };
  }

  isNew(group: Group): boolean {
    return !group.$key;
  }

  saveGroup(group: Group) {
    let _group = Object.assign({}, group);
    let key = _group['$key'];
    delete _group['$key'];
    delete _group['$exists'];
    if (this.isNew(group)) {
      this.groups$.push(_group);
    } else {
      let group$ = this.angularFire.database.object(`/groups/${key}`);
      group$.update(_group);
    }
  }

}
