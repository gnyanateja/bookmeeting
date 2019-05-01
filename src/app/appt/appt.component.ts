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
  endtime:number;
  
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
  imp=0;

  postsCol: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  postsCol1: AngularFirestoreCollection<Post>;
  posts1: Observable<Post[]>;
  postids: Observable<Postid[]>;
  user: Array<User[]>;
  mam_out:boolean;
  constructor(
    private afs: AngularFirestore,
    private router: Router
  ) {
  }


  ngOnInit() {
   // this.isLogged();
    this.starting();


  }

  todo(x) {
    console.log(x);
    this.n = this.n + 1;
    if (this.n == 2) {
      if (x.Accepted == true) {
        this.afs
          .collection("appointments")
          .doc(x.id)
          .update({
            Accepted: false});
      }
      else {
        this.afs
          .collection("appointments")
          .doc(x.id)
          .update({
            Accepted: true});
      }
      this.n = 0;
      this.starting();
    }

  }

  isLogged(){
    const  user  =  JSON.parse(localStorage.getItem('token'));
    if(user!="aduma"){
      this.router.navigate(['/login']);
    }
    
  }

  next() {
    this.router.navigate(['/todo']);
  }

  nextOut() {
    this.afs.collection('features').doc('doc').update({maam_out:true});
    this.afs.collection('features').doc('isMaanIn').update({isMaanIn:false});
    this.mam_out=true;
  }

  nextIn() {
    this.afs.collection('features').doc('doc').update({maam_out:false});
    this.afs.collection('features').doc('isMaanIn').update({isMaanIn:true});
    this.mam_out=false;
  }

  nothing() {

  }


  starttimer(id){
    
    this.afs.collection('appointments').doc(id).update({startedAt:new Date(),endtime:1});
    
    this.starting();
  }


  endtimer(id){
    this.afs.collection('appointments').doc(id).update({endedAt:new Date(),isEnded:true,endtime:2});
    this.starting();
  }


  ender(id){

    this.afs.collection('appointments').doc(id).update({endtime:3});
    this.starting();

    };
  


  starting() {
    // this.postsCol= this.afs.collection('appointments');
    // this.posts=this.postsCol.valueChanges();
    //afs.collection('items', ref => ref.where('size', '==', 'large'))

    var d = new Date(); // for now
   
    
    this.postsCol = this.afs.collection('appointments',ref => ref.orderBy('StartTime'));
    this.posts = this.postsCol.snapshotChanges().pipe(
      map(actions => actions.map(a => {
      
        //console.log((a.payload.doc.data().StartTime));
         //if(d<=a.payload.doc.data().StartTime){
          //  console.log(a.payload.doc.data().endtime);
          
             
           
          const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data };
        //}
        
      }
      ))
    );

    this.afs.collection('features').doc('doc').ref.get()
    .then((doc)=>{
      if(doc.exists){
        this.mam_out=doc.data().maam_out;
        
      }
    });
    
    


  }




}
