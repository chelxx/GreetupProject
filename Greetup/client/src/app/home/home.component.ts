import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  events;

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }


  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    console.log("Got to getevents in home.ts");
    var observable = this._httpService.getEvents();
    observable.subscribe(data => {
      this.events = data['events'];
    console.log("list of events:", this.events)
  })
  }
}
