import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



export interface Post {
  Accepted: boolean;
  day: string;
  duration: string;
  hour: string;
  minute: string;
  month: string;
  username: string;
  year: string;
  endtime: string;
}
export interface Postid extends Post {
  id: string;
}
export interface User {
  email:string;
  name: string;
  password:string;
  stage:string;
  type:string;
  username:string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  title = 'appoint';
  items=new Array();
  n = 0;

  postsCol: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  postsCol1: AngularFirestoreCollection<Post>;
  posts1: Observable<Post[]>;
  postids: Observable<Postid[]>;
  user: Array<User[]>;

  constructor(
    private afs: AngularFirestore,
    private router: Router
  ) {
  }


  ngOnInit() {

    this.starting()


  }

  todo(x) {
    console.log(x);
    this.n = this.n + 1;
    if (this.n == 2) {
      if (x.Accepted == true) {
        this.afs
          .collection("appointments")
          .doc(x.id)
          .set({
            Accepted: false, day: x.day, duration: x.duration,
            endtime: x.endtime, hour: x.hour, minute: x.minute, month: x.month, username: x.username, year: x.year
          });
      }
      else {
        this.afs
          .collection("appointments")
          .doc(x.id)
          .set({
            Accepted: true, day: x.day, duration: x.duration,
            endtime: x.endtime, hour: x.hour, minute: x.minute, month: x.month, username: x.username, year: x.year
          });
      }
      this.n = 0;
      this.starting();
    }

  }

  starting() {
    // this.postsCol= this.afs.collection('appointments');
    // this.posts=this.postsCol.valueChanges();
    //afs.collection('items', ref => ref.where('size', '==', 'large'))
    this.postsCol = this.afs.collection('appointments', ref => ref.orderBy('hour'));
    this.posts = this.postsCol.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data };
      }
      ))
    );

    // this.afs.collection("appointments").valueChanges().forEach(element => {
    //   element.forEach(el => {
    //     this.afs.collection('users', ref => ref.where("username", "==", el.username))
    //       .valueChanges().forEach(edy => {
    //         edy.forEach(ed => {
    //           this.items.push(ed.name);
    //         })
    //       })
    //   })
    // });

    console.log(this.items)


  }





}



