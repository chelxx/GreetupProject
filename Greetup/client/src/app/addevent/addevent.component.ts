import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { Http } from '@angular/http';
import { MapService } from '../map.service';


@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent implements OnInit {

  newEvent = {name: "", description: "", street: "", city: "", state:"", zip: Number , date: Date , lat: Number , lng: Number };
  error;
  errors;

  constructor(private _httpService: HttpService, private _router: Router, private_route: ActivatedRoute, private _mapService: MapService) { }

  ngOnInit() {
  }
  // Grabs full address from form and sends to geocoding for lat/lng before sending address to addEvent()
  sendToGeocode(): void {
    var event = this.newEvent;
    var address = `${event.street}, ${event.city}, ${event.state}, ${event.zip}`
    console.log("GOT TO sendtoGeocode in addEvent ts");
    var observable = this._mapService.codeAddress(address);
    observable.subscribe(data => { 
      console.log("sendtoGeoCode returned data in add: ", data);
      var location = data[0].geometry.location;
      this.addEvent({
        lat: location.lat(),
        lng: location.lng(),
      })
    })
  }
  addEvent(location): void {
    console.log("hit the addevent method from GeoCode with data")
    console.log('location: ', location);
    this.newEvent.lat = location.lat;
    this.newEvent.lng = location.lng;
    var observable = this._httpService.addEvent(this.newEvent);
    console.log("GOT TO ADD EVENT 1", this.newEvent);
    observable.subscribe( data => {
      console.log("GOT TO ADD EVENT 2", data);
      if(data['message'] == "Success!") {
        console.log("GOT TO ADD EVENT 3");
        this.newEvent = {name: "", description: "", street: "", city: "", state:"", zip: Number , date: Date, lat: Number, lng: Number }
        console.log("GOT TO ADD EVENT 4");
        this._router.navigate(['home']);
      }
      else{
        this.error = data['error']['message'];
        this.errors = data['message'];
        console.log("IN ERRORS", this.error, this.errors)
      }
    })
  }
}
