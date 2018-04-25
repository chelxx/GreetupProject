import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { FormsModule } from '@angular/forms'; 
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginregComponent } from './loginreg/loginreg.component';
import { HomeComponent } from './home/home.component';
import { AddeventComponent } from './addevent/addevent.component';
import { EditeventComponent } from './editevent/editevent.component';
import { VieweventComponent } from './viewevent/viewevent.component';
import { MapComponent } from './map/map.component';

// import { PersistenceModule } from 'angular-persistence';

@NgModule({
  declarations: [
    AppComponent,
    LoginregComponent,
    HomeComponent,
    AddeventComponent,
    EditeventComponent,
    VieweventComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpModule,

    // PersistenceModule,

  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
