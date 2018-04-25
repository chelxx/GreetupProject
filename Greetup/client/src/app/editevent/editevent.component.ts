import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-editevent',
  templateUrl: './editevent.component.html',
  styleUrls: ['./editevent.component.css']
})
export class EditeventComponent implements OnInit {

  edEvent = {name: "", description: "", street: "", city: "", state:"", zip: Number , date: Date };
  eventID;
  error;

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this.eventID = params.get('id');
      console.log('ID is', this.eventID)
      var observable = this._httpService.viewEvent(this.eventID);
      console.log("GOT TO EDIT HERE")
      observable.subscribe(data => {
        this.edEvent = data['event']
        console.log(data);
      })
    })
  }
  editEvent(eventID): void {
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
      this._router.navigate(['']);
    })
  }
}
