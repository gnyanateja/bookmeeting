import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {FormsModule} from '@angular/forms';
import { TodoComponent } from './todo/todo.component';
import { ApptComponent } from './appt/appt.component';
import { LoginComponent } from './login/login.component';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';


const routes: Routes = [
  {path: 'home', component: ApptComponent},
  {path: 'login',component: LoginComponent },
  {path: 'todo', component: TodoComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}, // pathmatch is used for checking exact match
];


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
    AppComponent,
    TodoComponent,
    ApptComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
     AngularFirestoreModule,
     NgbModule.forRoot(),
    AppRoutingModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatPasswordStrengthModule,
    BrowserAnimationsModule,
    MatPasswordStrengthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
