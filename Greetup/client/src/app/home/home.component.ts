import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms'; 
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
// import {MatTableDataSource} from '@angular/material';

 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  events;
  name;

  filteredOptions: Observable<string[]>;
  
  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getEvents();
    this.filteredOptions = this.searchControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
      console.log("home comp ngOnInt filtered options")
    // this.name = this._httpService.getUser();
    // console.log("HOME INIT!!!!",this.name);
    this.name = localStorage.getItem('sessionName');
    
  }
  getEvents(): void {
    console.log("Got to getevents in home.ts");
    var observable = this._httpService.getEvents();
    observable.subscribe(data => {
      this.events = data['events'];
      console.log("list of events:", this.events)
    })
  }

  filter(val: string): string[] {
    return this.events.filter(event =>
      event.toLowerCase().indexOf(val.toLowerCase()) === 0);
      
  }
}
