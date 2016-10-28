import {Component, OnInit} from '@angular/core';
import {LogsService} from '../shared/logs.service';
import {Log} from '../shared/log';

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.css']
})
export class LogsListComponent implements OnInit {

  isLoading: boolean = true;

  logs: Log[] = [];
  sum: number;

  constructor(private logsService: LogsService) {
  }

  ngOnInit() {
    this.logsService.getLogs()
      .subscribe((logs: Log[]) => {
        this.logs = logs;
        this.sum = logs.reduce((sum, log: Log) => {
          return sum + log.sum;
        }, 0);
        this.isLoading = false;
      });
  }

}
