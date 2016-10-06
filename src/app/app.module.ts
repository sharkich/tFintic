import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

import { routing, appRoutingProviders } from './app.routing';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemDetailsComponent } from './item-details/item-details.component'

export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyAtcV7fnR7l9uyT3w4bPxn3TjW31ffGdk8',
  authDomain: 'tfintic-58d11.firebaseapp.com',
  databaseURL: 'https://tfintic-58d11.firebaseio.com',
  storageBucket: 'tfintic-58d11.appspot.com',
  messagingSenderId: '382830496451'
};

export const FIREBASE_AUTH_CONFIX = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    HeaderComponent,
    ItemsListComponent,
    ItemDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    routing,

    AngularFireModule.initializeApp(FIREBASE_CONFIG, FIREBASE_AUTH_CONFIX)
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
