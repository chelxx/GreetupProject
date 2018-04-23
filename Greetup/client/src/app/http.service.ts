import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  registerUser(regUser) {
    console.log("SERVICE! REGISTER USER!");
    return this._http.post('/api/registeruser', regUser);
  }
}
