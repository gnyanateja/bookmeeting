import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  list: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }

  getUsers() {
  this.list=this.db.list('users');
  return this.list.snapshotChanges();
  }
}
