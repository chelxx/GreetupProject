import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  name;

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.name = localStorage.getItem('sessionName');
  }

  logoutUser(): void {
  console.log("BANNER-COMP! LOGGIN OUT USER!");
    this._httpService.logoutUser().then(data => {
      console.log()
      this._router.navigate(['']);
    })
  }
}
