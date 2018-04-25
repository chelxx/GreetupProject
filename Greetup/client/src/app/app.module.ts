import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { LoginregComponent } from './loginreg/loginreg.component';
import { HomeComponent } from './home/home.component';
import { AddeventComponent } from './addevent/addevent.component';
import { EditeventComponent } from './editevent/editevent.component';
import { VieweventComponent } from './viewevent/viewevent.component';
import { MapComponent } from './map/map.component';

// import { PersistenceModule } from 'angular-persistence';
import { AgmCoreModule } from '@agm/core';

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
    ReactiveFormsModule,
    CommonModule,
    HttpModule,

    // PersistenceModule,

    AgmCoreModule.forRoot({
      apiKey:"AIzaSyBQ2xKMzTUY7TDBuiKephoqpxXajWb2_9s",
      libraries: ["places"]
    })
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
