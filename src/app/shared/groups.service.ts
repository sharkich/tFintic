import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {AuthService} from './auth.service';
import {Group} from './group';

@Injectable()
export class GroupsService {

  private groups$: FirebaseListObservable<Group[]>;
  private groups: Group[] = [];

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
    return Observable.create((observer) => {
      this.groups$.subscribe((groups: Group[]) => {
        console.log('on', groups);
        this.groups = groups;
        observer.next(this.groups);
        observer.complete();
      });
    });
  }

  getGroup(key: string): Observable<Group> {
    return Observable.create((observer) => {
      this.groups$.subscribe((groups: Group[]) => {
        let group = groups.find((_group: Group) => {
          return _group.$key === key;
        });
        observer.next(group);
        if (group) {
          observer.complete();
        }
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
    return !!group.$key;
  }

}
