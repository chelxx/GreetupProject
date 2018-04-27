import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import {MatInputModule} from '@angular/material/input';
// import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginregComponent } from './loginreg/loginreg.component';
import { HomeComponent } from './home/home.component';
import { AddeventComponent } from './addevent/addevent.component';
import { EditeventComponent } from './editevent/editevent.component';
import { VieweventComponent } from './viewevent/viewevent.component';
import { BannerComponent } from './banner/banner.component';
import { MapComponent } from './map/map.component';
import { ChatComponent } from './chat/chat.component';


import { Ng2CompleterModule } from "ng2-completer";
// import { PersistenceModule } from 'angular-persistence';
import { AgmCoreModule } from '@agm/core';
import { MapService } from './map.service';
import { ChatService } from './chat.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginregComponent,
    HomeComponent,
    AddeventComponent,
    EditeventComponent,
    VieweventComponent,
    BannerComponent,
    MapComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpModule,
    // Ng2SearchPipeModule,
    Ng2CompleterModule,
    // MatAutocompleteModule,
    // MatInputModule,
    // MatTableModule,
    BrowserAnimationsModule,
    // PersistenceModule,

    AgmCoreModule.forRoot({
      apiKey:"AIzaSyBQ2xKMzTUY7TDBuiKephoqpxXajWb2_9s",
      libraries: ["places"]
    })
  ],
  providers: [
    HttpService,
    MapService,
    ChatService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
