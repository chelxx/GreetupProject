import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent implements OnInit {

  newEvent = {name: "", description: "", street: "", city: "", state:"", zip: Number , date: Date };
  error;
  errors;

  constructor(private _httpService: HttpService, private _router: Router, private_route: ActivatedRoute) { }

  ngOnInit() {
  }
  addEvent(): void {
    console.log("GOT TO ADD EVENT 0");
    var observable = this._httpService.addEvent(this.newEvent);
    console.log("GOT TO ADD EVENT 1", this.newEvent);
    observable.subscribe( data => {
      console.log("GOT TO ADD EVENT 2", data);
      if(data['message'] == "Success!") {
        console.log("GOT TO ADD EVENT 3");
        this.newEvent = {name: "", description: "", street: "", city: "", state:"", zip: Number , date: Date }
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
