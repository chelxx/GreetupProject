import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Http } from '@angular/http';
import { MapService } from '../map.service';

@Component({
  selector: 'app-editevent',
  templateUrl: './editevent.component.html',
  styleUrls: ['./editevent.component.css']
})
export class EditeventComponent implements OnInit {

  edEvent = {name: "", description: "", street: "", city: "", state:"", zip: Number , date: Date , lat: Number , lng: Number };
  eventID;
  error;

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute, private _mapService: MapService) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this.eventID = params.get('id');
      console.log('ID is', this.eventID)
      var observable = this._httpService.viewEvent(this.eventID);
      console.log("GOT TO EDIT HERE")
      observable.subscribe(data => {
        this.edEvent = data['event']
        console.log(this.edEvent);
      })
    })
  }

  sendToGeocode(eventID): void {
    var event = this.edEvent;
    var address = `${event.street}, ${event.city}, ${event.state}, ${event.zip}`
    console.log("GOT TO sendtoGeocode in addEvent ts");
    var observable = this._mapService.codeAddress(address);
    observable.subscribe(data => { 
      console.log("sendtoGeoCode returned data in edit: ", data);
      var location = data[0].geometry.location;
      this.editEvent({
        lat: location.lat(),
        lng: location.lng(),
      }, eventID)
    })
  }

  editEvent(location, eventID): void {
    console.log("hit the editEvent method from GeoCode with data")
    this.edEvent.lat = location.lat;
    this.edEvent.lng = location.lng;
    let observable = this._httpService.editEvent(this.eventID, this.edEvent);
    observable.subscribe(data => {
      if (data['message'] == "Success!") {
        this._router.navigate(['/home']);
      }
      else {
        this.error = data['error']['message'];
      }
    })
  }

  deleteEvent(eventID): void {
    let observable = this._httpService.deleteEvent(this.eventID);
    observable.subscribe(data => {
      this._router.navigate(['/home']);
    })
  }
}
