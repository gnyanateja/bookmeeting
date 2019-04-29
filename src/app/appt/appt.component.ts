import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, Timestamp } from 'rxjs';
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
  StartTime:Date;
  
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
  selector: 'app-appt',
  templateUrl: './appt.component.html',
  styleUrls: ['./appt.component.css']
})
export class ApptComponent implements OnInit {

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


  next() {
    this.router.navigate(['/todo']);
  }

  starttimer(){


      
  }


  endtimer(){

  }




  starting() {
    // this.postsCol= this.afs.collection('appointments');
    // this.posts=this.postsCol.valueChanges();
    //afs.collection('items', ref => ref.where('size', '==', 'large'))

    var d = new Date(); // for now
   
    
    this.postsCol = this.afs.collection('appointments', ref => ref);
    this.posts = this.postsCol.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        console.log(d);
        var k=a.payload.doc.data().StartTime;
        //console.log((a.payload.doc.data().StartTime));
         //if(d<=a.payload.doc.data().StartTime){
          const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data };
        //}
        
      }
      ))
    );

    
    console.log(this.items)


  }




}
