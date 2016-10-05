import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';

export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyAtcV7fnR7l9uyT3w4bPxn3TjW31ffGdk8',
  authDomain: 'tfintic-58d11.firebaseapp.com',
  databaseURL: 'https://tfintic-58d11.firebaseio.com',
  storageBucket: 'tfintic-58d11.appspot.com',
  messagingSenderId: '382830496451'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    AngularFireModule.initializeApp(FIREBASE_CONFIG)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
