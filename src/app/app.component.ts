import { Component, OnInit } from '@angular/core';
import {FirebaseService} from './firebase.service';
import {Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore'; 
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';



export interface Post {
  Accepted :boolean;
  day : string;
  duration : string;
  hour : string;
  minute : string;
  month : string;
  username : string;
  year : string;
  endtime: string;
}
export interface Postid extends Post {
  id:string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit{
  title = 'appoint';
  items=[];
  n=0;

  postsCol: AngularFirestoreCollection<Post>;
  posts : Observable<Post[]>;
  postids: Observable<Postid[]>;


  constructor(
    private afs:AngularFirestore,
    public firebaseService: FirebaseService,
    private router: Router
  ) {
  }


 ngOnInit() {

this.starting()  

  
}
  
todo(x) {
  console.log(x);
  this.n=this.n+1;
  if(this.n==2){
    if(x.Accepted==true){
      this.afs
        .collection("appointments")
        .doc(x.id)
        .set({ Accepted: false,day:x.day,duration:x.duration,
          endtime:x.endtime,hour:x.hour,minute:x.minute,month:x.month,username:x.username,year:x.year });
    }
    else{
      this.afs
        .collection("appointments")
        .doc(x.id)
        .set({ Accepted: true,day:x.day,duration:x.duration,
          endtime:x.endtime,hour:x.hour,minute:x.minute,month:x.month,username:x.username,year:x.year });
    }
    this.n=0;
  this.starting();
  }
  
}

starting() {
  // this.postsCol= this.afs.collection('appointments');
  // this.posts=this.postsCol.valueChanges();
  this.postsCol= this.afs.collection('appointments');
  this.posts=this.postsCol.snapshotChanges().pipe(
    map(actions => actions.map(a => {
    const data = a.payload.doc.data() as Post;
    const id = a.payload.doc.id;
    return { id, ...data };
  }
  ))
  );


  

}





}



