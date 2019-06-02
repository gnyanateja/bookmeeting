import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from '../user.service';



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
  r:any;
  constructor(
    private _myservice: UserService,
    private http: HttpClient,
    private afs: AngularFirestore,
    private router: Router
  ) {
  }


  ngOnInit() {
    this.isLogged();
    this.starting();


  }

  just(x){
    console.log(x);
    this.r=x;
  }

  isAd(){
    this._myservice.deleteEvent("hi")
    .subscribe(
    data => {
      this.afs.collection('appointments').add(data);
    },
    error => {
      console.log('failure');
     }
  );
  this.starting();
  }

  


  todo(x) {
    console.log(x);
    this.n = this.n + 1;
    if (this.n == 2) {
      if(x.endtime!=3){
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
              var st=x.StartTime;
              var et=x.EndTime;
              var user ={
                name:x.name,
                typeOfMeeting:x.typeOfMeeting,
                StartTime:st.toDate(),
                EndTime:et.toDate(),
                id:x.id
              }
              this._myservice.addEvent(user)
            .subscribe(
            data => {
              console.log('sucess');
            },
            error => {
              console.log('failure');
             }
          );

        }
      }
      else{
        this.afs
        .collection("appointments")
        .doc(x.id)
        .update({
          Accepted: true,EndedAt:2});
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
    this.afs.collection('features').doc('isMaamIn').update({isMaamIn:false});
    this.mam_out=true;
  }

  nextIn() {
    this.afs.collection('features').doc('doc').update({maam_out:false});
    this.afs.collection('features').doc('isMaamIn').update({isMaamIn:true});
    this.mam_out=false;
  }

  nothing() {

  }


  starttimer(){
    
    this.afs.collection('appointments').doc(this.r.id).update({startedAt:new Date(),endtime:1});
    console.log(this.r);
    this.starting();
  }

  startrej(){
    this.afs.collection('appointments').doc(this.r.id).update({isRejected:true});
    this.starting();
  }

  endtimer(){
    console.log(this.r);
    this.afs.collection('appointments').doc(this.r.id).update({endedAt:new Date(),isEnded:true,endtime:2});
    this.starting();
  }


  ender(){
    console.log(this.r);
    this.afs.collection('appointments').doc(this.r.id).update({endtime:3});
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
