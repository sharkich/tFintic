import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LogsService} from '../shared/logs.service';
import {GroupsService} from '../shared/groups.service';
import {Log} from '../shared/log';
import {Group} from '../shared/group';

@Component({
  selector: 'app-log-edit',
  templateUrl: './log-edit.component.html',
  styleUrls: ['./log-edit.component.css']
})
export class LogEditComponent implements OnInit {

  isLoading: boolean = true;

  log: Log = this.logsService.getEmptyLog();
  groups: Group[] = [];

  constructor(private logsService: LogsService,
              private groupsService: GroupsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.route.params.forEach((params: Params) => {
      let key = params['id'];

      this.groupsService.getGroups()
        .subscribe((groups: Group[]) => {
          this.groups = groups;
        });

      if (key === 'new') {
        this.isLoading = false;
        return;
      }

      this.logsService.getLog(key)
        .subscribe((log: Log) => {
          this.log = log;
          this.isLoading = false;
        });

    });
  }

  isNew(): boolean {
    return this.logsService.isNew(this.log);
  }

  save() {
    this.logsService.saveLog(this.log);
    this.router.navigate(['/logs']);
    return false;
  }

  changeGroup(groupKey: string) {
    this.log.groupKey = groupKey;
    this.groupsService.getGroup(groupKey).subscribe((group: Group) => {
      if (group) {
        this.log.highlighting1 = group.highlighting;
      } else {
        this.log.highlighting1 = '';
      }
    });
  }

  remove() {
    this.logsService.deleteLog(this.log);
    this.router.navigate(['/logs']);
    return false;
  }

}
