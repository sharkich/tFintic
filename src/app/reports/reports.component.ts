import {Component, OnInit} from '@angular/core';
import {GroupsService} from '../shared/groups.service';
import {LogsService} from '../shared/logs.service';
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

  groupsStatistics = {};
  groups: Group[];
  logs: Log[];

  constructor(private logsService: LogsService,
              private groupsService: GroupsService) {}

  ngOnInit() {
    this.groupsService.getGroups()
      .subscribe((groups: Group[]) => {
        this.groups = groups;

        groups.forEach((group: Group) => {
          let groupsStatistics: GroupStatistic = {
            group,
            logsSum: 0,
            percentage: 0,
            highlighting: '',
            logs: []
          };
          this.groupsStatistics[group.$key] = groupsStatistics;
        });

        this.logsService.getLogs()
          .subscribe((logs: Log[]) => {
            this.logs = logs;

            logs.forEach((log: Log) => {
              let groupsStatistic: GroupStatistic = this.groupsStatistics[log.groupKey];
              groupsStatistic.logsSum += log.sum;
              groupsStatistic.percentage = Math.round(groupsStatistic.logsSum * 100 / groupsStatistic.group.sum);

              if (groupsStatistic.percentage > 95) {
                groupsStatistic.highlighting = 'danger';
              } else if (groupsStatistic.percentage > 70) {
                groupsStatistic.highlighting = 'warning';
              } else if (groupsStatistic.percentage > 50) {
                groupsStatistic.highlighting = 'info';
              } else {
                groupsStatistic.highlighting = 'success';
              }

              groupsStatistic.logs.push(log);
            });

            this.isLoading = false;
          });

      });


  }

}
