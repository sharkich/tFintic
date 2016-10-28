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
      throw new Error('Owner Key is not ready!!!! O_O');
    }
  }

  getGroups(): Observable<Group[]> {
    return Observable.create((observer) => {
      if (this.groups$) {
        console.log('fast getGroups');
        observer.next(this.groups);
        observer.complete();
        return;
      }
      console.log('slow getGroups');
      this.groups$ = this.angularFire.database.list('/groups', {
        query: {
          orderByChild: 'ownerKey',
          equalTo: this.authService.getOwnerKey()
        }
      });
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
      if (this.groups$) {
        let group = this.groups.find((_group: Group) => {
          return _group.$key === key;
        });
        console.log('fast getGroup');
        observer.next(group);
        observer.complete();
        return;
      }
      console.log('slow getGroup');
      let group$ = this.angularFire.database.object(`/groups/${key}`);
      group$.subscribe((group: Group) => {
        console.log('on', group);
        observer.next(group);
        observer.complete();
      });
    });
  }

}
