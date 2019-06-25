import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from '../user.service';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Timestamp } from 'rxjs/internal/operators/timestamp';



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
  EndTime:Date;
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
  composeForm: FormGroup;
  title = 'appoint';
  items = new Array();
  n = 0;
  imp=0;


  postsCol: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  postsCol1: AngularFirestoreCollection<Post>;
  posts1: Observable<Post[]>;
  postids: Observable<Postid[]>;
  user: Array<User[]>;
  mam_out = true;
  r:any;
  constructor(
    private _myservice: UserService,
    private http: HttpClient,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.composeForm = new FormGroup({
      val: new FormControl(null, Validators.required),
    });
  }
  isValid(controlName) {
    return this.composeForm.get(controlName).invalid && this.composeForm.get(controlName).touched;
  }


  ngOnInit() {
    this.isLogged();
    this.starting();


  }

  just(x){
    this.r=x;
  }

  isAd(){
    this._myservice.deleteEvent("hi")
    .subscribe(
    data => {
      var y=data.valueOf();
      console.log(y.valueOf());
      this.afs.collection('appointments').add(data);
    },
    error => {
      console.log('failure');
     }
  );
  this.starting();
  }




  todo(x) {

    this.n = this.n + 1;
    if (this.n == 2) {
      if(x.endtime!=3){
        if (x.Accepted == true) {
          this.afs
            .collection("appointments")
            .doc(x.id)
            .update({
              Accepted: false});
              var st11=x.StartTime;
              var et11=x.EndTime;


              var user11 ={
                name:x.name,
                typeOfMeeting:x.typeOfMeeting,
                StartTime:st11.toDate().toString(),
                EndTime:et11.toDate().toString(),
                time:x.year+"-"+(x.month+1)+"-"+x.day+" 5:40 AM",
                time1:x.year+"-"+(x.month+1)+"-"+x.day+" 11:40 PM"
              }


              this._myservice.RemoveEvent(user11)
              .subscribe(
              data => {
                console.log('sucess');
              },
              error => {
                console.log('failure');
               }
            );



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

          this.afs.collection('users', ref => ref.where('name', '==', x.name)).get().forEach(
            actions => actions.forEach(a => {
                  var mail=a.data().email;
                  var dT=x.day+"/"+(x.month+1)+"/"+x.year;
                  var sT=x.hour+":"+x.minute;
                  this._myservice.mailAEvent({"mail":mail,"date":dT,"StartTime":sT})
                  .subscribe(
                  data => {
                    console.log("suceess");
                  },
                  error => {
                    console.log(error);
                   }
                );
                }));



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

  startForgot() {

    var user ={
      name:this.r.name,
      des:this.r.typeOfMeeting,
      StartTime:this.r.StartTime.toDate(),
      EndTime:this.r.EndTime.toDate()
    }

    this.afs.collection('appointments').doc(this.r.id).update({forgot:true,isRejected:true});
    this._myservice.creatEvent(user)
                  .subscribe(
                  data => {
                    this.afs.collection('appointments').add(data);
                    console.log("cal success");
                  },
                  error => {
                    console.log(error);
                   }
                );

    this.starting();
  }

  starttimer() {
    if (this.composeForm.valid) {
      this.afs.collection('appointments').doc(this.r.id).update({startedAt:new Date(),endtime:1,count:this.composeForm.value.val});
      this.afs.collection('features').doc("isMaamIn").update({meeting:"Ongoing"});

      this.starting();
    }
  }





  startrej(){
    this.afs.collection('appointments').doc(this.r.id).update({isRejected:true});

   this.afs.collection('users', ref => ref.where('name', '==', this.r.name)).get().forEach(
    actions => actions.forEach(a => {
          var mail=a.data().email;
          var dT=this.r.day+"/"+(this.r.month+1)+"/"+this.r.year;
          var sT=this.r.hour+":"+this.r.minute;
          this._myservice.mailREvent({"mail":mail,"date":dT,"StartTime":sT})
          .subscribe(
          data => {
            console.log("suceess");
          },
          error => {
            console.log(error);
           }
        );
        }));


    this.starting();

  }

  endtimer(){

    this.afs.collection('appointments').doc(this.r.id).update({endedAt:new Date(),isEnded:true,endtime:2});
    this.afs.collection('features').doc("isMaamIn").update({meeting:"Free"});
    this.starting();
  }


  ender(){

    this.afs.collection('appointments').doc(this.r.id).update({endtime:3});
    this.starting();

    };



  starting() {
    // this.postsCol= this.afs.collection('appointments');
    // this.posts=this.postsCol.valueChanges();
    //afs.collection('items', ref => ref.where('size', '==', 'large'))

    var d = new Date(); // for now
    var d1=d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
    this.afs.collection('features').doc('todate').get().forEach(
      actions => {
            var y1=actions.data().todate;

            var y=y1.toDate();
            var d2=y.getDate()+"/"+(y.getMonth()+1)+"/"+y.getFullYear();

            if(d1!=d2){
              this.afs.collection('features').doc('todate').update({todate:d});
              const time=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" 5:40 AM"
              const time1=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" 11:40 PM"
              this._myservice.addResearch({time1:time1,time:time})
              .subscribe(
              (data:Post[]) => {

                while(data.length!=0){

                this.afs.collection('appointments').add(data.pop());
                }
              },
              error => {
                console.log('failure');
              }
            );
            }

            },

          );





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
