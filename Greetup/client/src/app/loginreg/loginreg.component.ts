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
  logUser = { loginemail: "", loginpassword: "" };
  loginpassworderror;
  registerpassworderror;
  registeremailerror;
  sessionName;
  sessionUserID;

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
  }

  registerUser(): void {
    console.log("REGISTER FORM RESULTS:", this.regUser);
    this._httpService.registerUser(this.regUser).then(data => {
      if(data['message'] == "Success") {
        console.log("LOGINREG-COMP! REGISTER SUCCESS!");
        this.regUser = { name: "", email: "", password: "" }
        this.sessionName = data['sessionName'];
        this.sessionUserID = data['sessionUserID'];
        // this._httpService.setUser(this.sessionName);
        localStorage.setItem( 'sessionName', this.sessionName )
        console.log("LOGINREG-COMP! BACKEND SESSION INFO:", this.sessionName, this.sessionUserID);
        this._router.navigate(['/home']);
      }
      else {
        console.log("LOGINREG-COMP! REGISTER ERROR!");
        if(data['message'] == "Passwords do not match!")
        {
          this.registerpassworderror = data['message'];
        }
        if(data['message'] == "Email already exists!")
        {
          this.registeremailerror = data['message'];
        }
        console.log("REGISTER FORM ERROR:", this.registerpassworderror)
      }
    })
  }

  loginUser(): void {
    console.log("LOGIN FORM RESULTS:", this.logUser)
    this._httpService.loginUser(this.logUser).then(data => {
      if(data['message'] == "Success") {
        console.log("LOGINREG-COMP! LOGIN SUCCESS!");
        this.logUser = { loginemail: "", loginpassword: "" }
        this.sessionName = data['sessionName'];
        this.sessionUserID = data['sessionUserID'];
        // this._httpService.setUser(this.sessionName);  
        localStorage.setItem( 'sessionName', this.sessionName ) 
        console.log("LOGINREG-COMP! BACKEND SESSION INFO:", this.sessionName, this.sessionUserID);  
        this._router.navigate(['/home']);
      }
      else {
        console.log("LOGINREG-COMP! LOGIN ERROR!");
        this.loginpassworderror = data['message']; 
        console.log("LOGIN FORM ERROR:", this.loginpassworderror)
      }
    })
  }
}