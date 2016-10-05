import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AppComponent } from './app.component';

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
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    AngularFireModule.initializeApp(FIREBASE_CONFIG, FIREBASE_AUTH_CONFIX)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
