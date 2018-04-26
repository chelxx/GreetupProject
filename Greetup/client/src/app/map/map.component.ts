import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import { HttpService } from '../http.service';

// import { Marker } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  public lat: number;
  public lng: number;
  public searchControl: FormControl;
  public zoom: number;
  public formatted_address: string;



  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private _httpService: HttpService) { }


   markers: marker[] = []


  ngOnInit() {
    //set google maps defaults
    this.getEvents();
    this.zoom = 14;
    this.lat = 41.8781,
    this.lng = -87.6298;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();


    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();


          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.formatted_address = place.formatted_address;
          this.zoom = 14;
          console.log(this.formatted_address);
          console.log(this.lat);
          console.log(this.lng);
          console.log(this.zoom);

        });
      });
    });
  }

  
  getEvents(): void {
    console.log("Got to getevents in home.ts");
    var observable = this._httpService.getEvents();
    observable.subscribe(data => {
      this.markers = data['events'];
      console.log("list of markers:", this.markers)
    })
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        //this.zoom = 14;
      });
    }
  }
}
interface marker {
  lat: number;
  lng: number;
  name: string;
}