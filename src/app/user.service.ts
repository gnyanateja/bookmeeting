import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  addEvent(body: any) {
    console.log(body);
    return this._http.post('https://bookcalender.herokuapp.com/addEvent', body, {
      observe: 'body'
    });
  }


}
