import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  composeForm:FormGroup; 
  hide=true;
  tam=true;
  constructor(private afs: AngularFirestore,
    private router: Router,
    
    private _activatedRoute: ActivatedRoute) {
      this.composeForm = new FormGroup({
        pass: new FormControl(null, Validators.required),
      });
      }

      isValid(controlName) {
        return this.composeForm.get(controlName).invalid && this.composeForm.get(controlName).touched;
      }
  ngOnInit() {
    
    console.log(crypto.MD5("password"));
  }

  log(){
    this.afs.collection('features').doc('doc').ref.get()
    .then((doc)=>{
      if(doc.exists){
        var ans=doc.data().pass;
        if(this.composeForm.value.pass==ans){
          localStorage.setItem('token', JSON.stringify(ans));
          this.router.navigate(['/home']);
      } else {
        localStorage.setItem('token', null);
        this.tam=false;
      }
        }
        
      
    });
    

  }

}

