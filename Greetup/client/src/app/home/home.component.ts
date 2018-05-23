import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms'; 
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
// import {MatTableDataSource} from '@angular/material';
import { CompleterService, CompleterData } from 'ng2-completer';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events;
  name;
  protected searchStr: string;
  protected dataService: CompleterData;
  // searchData = [{name:"froommm", _id
  // :"5ae2479d7e9ca632a7c21d67"}];
  searchData;

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute, private completerService: CompleterService) { 
    var observable = this._httpService.getEvents();
    observable.subscribe(data => {
      this.events = data['events'];
      console.log("all events", this.events);
      this.searchData = data['events'];
      console.log("list of events:", this.searchData)
      this.dataService = completerService.local(this.searchData, 'name', 'name');
    })
    
  }

  // value = '';
  // onEnter(value: string) { this.value = value; }
  // onItemSelect(selected:CompleterData){
  //   if(selected)
  //     this.searchStr = selected.events._id; 
  // }

  ngOnInit() {
    // this.getEvents();
    // this.name = this._httpService.getUser();
    // console.log("HOME INIT!!!!",this.name);
    //this.name = localStorage.getItem('sessionName');
    //this.searchData = this.events;
  }
  // getEvents(): void {
  //   console.log("Got to getevents in home.ts");
  //   var observable = this._httpService.getEvents();
  //   observable.subscribe(data => {
  //     this.events = data['events'];
  //     this.searchData = data['events'];
  //     console.log("list of events:", this.searchData)
  //   })
  // }
}
