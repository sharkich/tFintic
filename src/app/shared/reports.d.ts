import {Log} from './log';
import {Group} from './group';
export interface GroupStatistic {
  group: Group;
  logsSum: number;
  percentage: number;
  highlighting: string;
  logs: Log[];
}
