import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }
 // http://localhost:5000/addEvent
 // https://bookcalender.herokuapp.com/addEvent
  addEvent(body: any) {
    return this._http.post('https://bookcalender.herokuapp.com/addEvent', body, {
      observe: 'body'
    });
  }

  RemoveEvent(body: any) {
    
    return this._http.post('http://localhost:5000/RemoveEvent', body, {
      observe: 'body'
    });
  }

  deleteEvent(body: any){
    return this._http.post('https://bookcalender.herokuapp.com/deleteEvent', body, {
      observe: 'body'
    });
  }


  mailREvent(body: any){
    return this._http.post('https://bookcalender.herokuapp.com/mailREvent', body, {
      observe: 'body'
    });
  }

  mailAEvent(body: any){
    return this._http.post('https://bookcalender.herokuapp.com/mailAEvent', body, {
      observe: 'body'
    });
  }

 


}
