import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';

@Injectable()
export class MapService {

  // geocoder: google.maps.Geocoder;

    constructor(private mapsAPILoader: MapsAPILoader) {
      
      // console.log("*** map service constructor ***")
      //   this.geocoder = new google.maps.Geocoder();
    }

    /**
     * Geocoding service.
     *
     * Wraps the Google Maps API geocoding service into an observable.
     *
     * @param address The address to be searched
     * @return An observable of GeocoderResult
     */
    codeAddress(address: string): 
    Observable<google.maps.GeocoderResult[]> {
      console.log("*** map service codeAddress ***")      
       return Observable.create((observer: Observer<google.maps.GeocoderResult[]>) => {
        this.mapsAPILoader.load().then(() => {
          // Invokes geocode method of Google Maps API geocoding.
          let geocoder = new google.maps.Geocoder();
          geocoder.geocode({ address: address }, (
              (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
                  if (status === google.maps.GeocoderStatus.OK) {
                      observer.next(results);
                      observer.complete();
                  } else {
                      console.log(
                          'Geocoding service: geocode was not successful for the following reason: '
                          + status
                      );
                      observer.error(status);
                  }
              })
          );
        }
      )}
    )
  }
}
