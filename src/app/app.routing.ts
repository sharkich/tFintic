import {ModuleWithProviders}  from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from './shared/auth-guard.service';

import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

import {GroupsListComponent} from './groups-list/groups-list.component';
import {GroupEditComponent} from './group-edit/group-edit.component';

import {ItemsListComponent} from './items-list/items-list.component';
import {ItemDetailsComponent} from './item-details/item-details.component';

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
    path: 'items',
    component: ItemsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'items/:id',
    component: ItemDetailsComponent,
    canActivate: [AuthGuard],
  },

  {
    path: '**',
    component: PageNotFoundComponent
  }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
