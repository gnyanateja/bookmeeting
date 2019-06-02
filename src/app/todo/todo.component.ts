import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Feat{
  starttime:string;
  endtime:string;
  dnd:boolean;
}


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {
  composeForm: FormGroup;
  composeForm1: FormGroup;
  composeForm10: FormGroup;

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private _activatedRoute: ActivatedRoute) {
      this.composeForm = new FormGroup({
        starttime: new FormControl(null, Validators.required),
        startdate: new FormControl(null, Validators.required),
        endtime: new FormControl(null, Validators.required)
      });
      this.composeForm10 = new FormGroup({
        name:new FormControl(null, Validators.required),
        starttim: new FormControl(null, Validators.required),
        startdat: new FormControl(null, Validators.required),
        endtim: new FormControl(null, Validators.required)
      });
      this.composeForm1 = new FormGroup({
        duration: new FormControl(null,Validators.required)
      });
     }
     featCol:AngularFirestoreCollection<Feat>;
     feat:Observable<Feat[]>;
     stime:string;
     sdate:Date;
     duration:number;
     dndd:boolean;
     dndd_dur:number;
     isValid(controlName) {
      return this.composeForm.get(controlName).invalid && this.composeForm.get(controlName).touched;
    }
    isValid1(controlName) {
      return this.composeForm1.get(controlName).invalid && this.composeForm1.get(controlName).touched;
    }
  
  ngOnInit() {
    this.isLogged();
      //  this.featCol=this.afs.collection('features');
      //  this.feat=this.featCol.valueChanges();
      //  console.log(this.feat);
      this.startthis();
     
      

  }


  letit(){
    this.router.navigate(['/home']);
  }

  startthis(){
    this.afs.collection('features').doc('doc').ref.get()
    .then((doc)=>{
      if(doc.exists){
        
        this.duration=doc.data().duration;
        this.stime=doc.data().starttime;
        this.sdate=doc.data().startdate;
        this.dndd=doc.data().dnd;
        this.dndd_dur=doc.data().dnd_duration;
      }
    });
    

  }
  isLogged(){
    const  user  =  JSON.parse(localStorage.getItem('token'));
    if(user!="aduma"){
      this.router.navigate(['/login']);
    }
    
  }

  addEvent(){
    if(this.composeForm10.valid) {
      console.log(this.composeForm10.value.starttim);
      var temp10=this.composeForm10.value.startdat+" "+this.composeForm10.value.starttim;
      
      var Stime = new Date();
      
      //Stime.setDate(this.composeForm10.value.startdat);
      Stime.setTime(Number(this.composeForm10.value.starttim));
      var Etime=new Date();
      Etime.setFullYear(this.composeForm10.value.startdat);
      console.log(Stime);
      console.log(Etime);


        // this.afs.collection('appointments').add({
        //   Accepted:true,
        //   starttime:,
        //   duration:this.composeForm.value.endtime,
        //   startdate:this.composeForm.value.startdate
        // });
      }
  }

  addtime(){
    console.log(this.composeForm.value);
     if(this.composeForm.valid) {
     console.log(this.composeForm.value.starttime);
       this.afs.collection('features').doc('doc').update({starttime:this.composeForm.value.starttime,duration:this.composeForm.value.endtime,startdate:this.composeForm.value.startdate});
     }
  }

  addtime1(){
    console.log(this.composeForm1.value);
     if(this.composeForm1.valid) {
       this.adddnd();
     console.log(this.composeForm1.value.starttime);
     this.afs.collection('features').doc('doc').update({dnd_startedAt:new Date()});
       this.afs.collection('features').doc('doc').update({dnd_duration:this.composeForm1.value.duration});
       
     }
  }

  adddnd(){
  
          this.dndd=true;
          this.afs.collection('features').doc('doc').update({dnd:this.dndd});
  
  }


  removetime(){
    this.afs.collection('features').doc('doc').update({starttime:"",duration:0});
  }

  removetime1(){
    this.afs.collection('features').doc('doc').update({dnd_duration:0});
    this.afs.collection('features').doc('doc').update({dnd:false});
    this.dndd=false;
  }

  nothing(){
    
  }

}
