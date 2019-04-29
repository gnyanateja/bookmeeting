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

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private _activatedRoute: ActivatedRoute) {
      this.composeForm = new FormGroup({
        starttime: new FormControl(null, Validators.required),
        endtime: new FormControl(null, Validators.required)
      });
      this.composeForm1 = new FormGroup({
        duration: new FormControl(null,Validators.required)
      });
     }
     featCol:AngularFirestoreCollection<Feat>;
     feat:Observable<Feat[]>;
     stime:string;
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

      //  this.featCol=this.afs.collection('features');
      //  this.feat=this.featCol.valueChanges();
      //  console.log(this.feat);
      this.startthis();
     
      

  }


  startthis(){
    this.afs.collection('features').doc('doc').ref.get()
    .then((doc)=>{
      if(doc.exists){
        
        this.duration=doc.data().duration;
        this.stime=doc.data().starttime;
        this.dndd=doc.data().dnd;
        this.dndd_dur=doc.data().dnd_duration;
      }
    });
    

  }

  addtime(){
    console.log(this.composeForm.value);
     if(this.composeForm.valid) {
     console.log(this.composeForm.value.starttime);
       this.afs.collection('features').doc('doc').update({starttime:this.composeForm.value.starttime,duration:this.composeForm.value.endtime});
     }
  }

  addtime1(){
    console.log(this.composeForm1.value);
     if(this.composeForm1.valid) {
       this.adddnd();
     console.log(this.composeForm1.value.starttime);
       this.afs.collection('features').doc('doc').update({dnd_duration:this.composeForm1.value.duration});
       
     }
  }

  adddnd(){
  
          this.dndd=true;
          this.afs.collection('features').doc('doc').update({dnd:this.dndd});
          
      
    console.log(this.dndd);
    this.startthis();
  }


  removetime(){
    this.afs.collection('features').doc('doc').update({starttime:"",duration:0});
  }

  removetime1(){
    this.afs.collection('features').doc('doc').update({dnd_duration:0});
    this.afs.collection('features').doc('doc').update({dnd:false});
    this.dndd=false;
  }

}
