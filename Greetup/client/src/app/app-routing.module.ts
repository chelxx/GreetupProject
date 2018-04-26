import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// IMPORT ROUTING HERE
import { LoginregComponent } from './loginreg/loginreg.component';
import { HomeComponent } from './home/home.component';
import { AddeventComponent } from './addevent/addevent.component';
import { EditeventComponent } from './editevent/editevent.component';
import { VieweventComponent } from './viewevent/viewevent.component';
import { BannerComponent } from './banner/banner.component';
import { MapComponent } from './map/map.component';
import { ChatComponent } from './chat/chat.component';
// END IMPORT ROUTING

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'loginreg', component: LoginregComponent },
  { path: 'addevent', component: AddeventComponent },
  { path: 'editevent/:id', component: EditeventComponent },
  { path: 'greetup/:id', component: VieweventComponent },
  { path: 'banner', component: BannerComponent },
  { path: 'map', component: MapComponent},
  { path: 'chat', component: ChatComponent },
  { path: '', pathMatch:'full', component: LoginregComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }