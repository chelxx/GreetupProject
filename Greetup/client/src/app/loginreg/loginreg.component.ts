import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-loginreg',
  templateUrl: './loginreg.component.html',
  styleUrls: ['./loginreg.component.css']
})
export class LoginregComponent implements OnInit {

  regUser = { name: "", email: "", password: "" };
  logUser = { email: "", password: "" };
  error;

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
  }

  registerUser(): void {
    console.log("REGISTER FORM RESULTS:", this.regUser);
    this._httpService.registerUser(this.regUser).then(data => {
      if(data['message'] == "Success") {
        console.log("LOGINREG-COMP! REGISTER SUCCESS!");
        this.regUser = { name: "", email: "", password: "" }
        this._router.navigate(['/home']);
      }
      else {
        console.log("LOGINREG-COMP! REGISTER ERROR!");
        this.error = data['error']['message'];
        console.log("REGISTER FORM ERROR:", this.error)
      }
    })
  }

  loginUser(): void {
    console.log("LOGIN FORM RESULTS:", this.logUser)
    this._httpService.loginUser(this.logUser).then(data => {
      if(data['message'] == "Success") {
        console.log("LOGINREG-COMP! LOGIN SUCCESS!");
        this.logUser = { email: "", password: "" }
        this._router.navigate(['/home']);
      }
      else {
        console.log("LOGINREG-COMP! LOGIN ERROR!");
        this.error = data['error']['message'];
        console.log("LOGIN FORM ERROR:", this.error)
      }
    })
  }
}