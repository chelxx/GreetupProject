import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {

  name;

  constructor(private _http: HttpClient) { }

  // ******************** //
  // START OF LOGIN/REG SERVICE
  registerUser(regUser) {
    console.log("SERVICE! REGISTER USER!");
    return this._http.post('/api/registeruser', regUser).map(data => data).toPromise();
  }
  loginUser(logUser) {
    console.log("SERVICE! LOGIN USER!", logUser);
    return this._http.post('/api/loginuser', logUser).map(data => data).toPromise();
  }
  logoutUser() {
    console.log("SERVICE! LOGOUT USER!");
    return this._http.post('/api/logout', {}).map(data => data).toPromise();
  }
  setUser(name) {
    this.name = name;
    console.log("SERVER NAME!!!!!",this.name);
  }
  getUser() {
    return this.name;
  }
  // END OF LOGIN/REG SERVICE
  // ******************** //
  // START OF CRUD EVENT SERVICE
  getEvents() {
    console.log('got to get events method')
    return this._http.get('/events');
  }
  addEvent(newEvent) {
    return this._http.post('/api/events', newEvent);
  }
  viewEvent(eventID){
    return this._http.get(`/api/viewEvent/${eventID}`);
  }
  edit(eventID){
    return this._http.get(`/api/events/${eventID}`)
  }
  editEvent(eventID, edEvent){
    return this._http.put(`/api/editEvent/${eventID}`, edEvent);
  }
  deleteEvent(eventID){
    return this._http.delete(`/api/deleteEvent/${eventID}`);
  }
  // END OF CRUD EVENT SERVICE
  // ******************** //
}