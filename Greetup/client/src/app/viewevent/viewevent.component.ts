import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-viewevent',
  templateUrl: './viewevent.component.html',
  styleUrls: ['./viewevent.component.css']
})
export class VieweventComponent implements OnInit {

  eventID;
  event;
  error;
  likes;
  isClickedOnce = false;

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.viewEvent();
  }
  viewEvent(){
    this._route.params.subscribe((params: Params) => {
      this.eventID = params['id'];
      console.log(params['id'])
    });
    var observable = this._httpService.viewEvent(this.eventID);
    observable.subscribe(data => {
      this.event = data['event'];
    })
  }

  likeEvent(): void {
    this.event.likes++;
    let observable = this._httpService.editEvent(this.eventID, {likes: this.event.likes});
    observable.subscribe(data => {

    })
    this.isClickedOnce=true;
  }
}
