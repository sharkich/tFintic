import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from './shared/auth-guard.service';

import {LoginComponent} from './login/login.component';
import {SettingsComponent} from './settings/settings.component';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

import {GroupsListComponent} from './groups-list/groups-list.component';
import {GroupEditComponent} from './group-edit/group-edit.component';

import {LogsListComponent} from './logs-list/logs-list.component';
import {LogEditComponent} from './log-edit/log-edit.component';

import {ReportsComponent} from './reports/reports.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },

  {
    path: 'groups',
    component: GroupsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'groups/:id',
    component: GroupEditComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'logs',
    component: LogsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'logs/:id',
    component: LogEditComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AuthGuard],
  },

  {
    path: '**',
    component: PageNotFoundComponent
  }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
