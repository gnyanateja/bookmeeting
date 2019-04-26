import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AngularFireDatabaseModule } from 'angularfire2/database';

import {FormsModule} from '@angular/forms';
export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyCsiTkDAW2cFcRYPDtZHYGxnadt3xl-ZoI",
    authDomain: "appointmenter-10074.firebaseapp.com",
    databaseURL: "https://appointmenter-10074.firebaseio.com",
    projectId: "appointmenter-10074",
    storageBucket: "appointmenter-10074.appspot.com",
    messagingSenderId: "736348785150"
  }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
 	  AngularFirestoreModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
