import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {LogsService} from '../shared/logs.service';
import {GroupsService} from '../shared/groups.service';
import {Log} from '../shared/log';
import {Group} from '../shared/group';

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.css']
})
export class LogsListComponent implements OnInit {

  isLoading: boolean = true;

  logs: Log[] = [];
  groups: Group[] = [];
  sum: number;

  currentMonth: string = '';

  constructor(private logsService: LogsService,
              private groupsService: GroupsService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.currentMonth = this.authService.getCurrentMonth();

    this.logsService.getLogs()
      .subscribe((logs: Log[]) => {
        this.logs = logs;
        this.sum = logs.reduce((sum, log: Log) => {
          return sum + log.sum;
        }, 0);
        this.isLoading = false;
      });

    this.groupsService.getGroups()
      .subscribe((groups: Group[]) => {
        this.groups = groups;
      });
  }

  getGroupOfLog(log: Log): Group {
    return this.groups.find((group: Group) => {
      return group.$key === log.groupKey;
    });
  }

}
