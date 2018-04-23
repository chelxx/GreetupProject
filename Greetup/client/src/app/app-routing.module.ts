import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// IMPORT ROUTING HERE
import { LoginregComponent } from './loginreg/loginreg.component';
import { HomeComponent } from './home/home.component';
// END IMPORT ROUTING

const routes: Routes = [
  {path: 'home',component: HomeComponent},
  {path: 'loginreg',component: LoginregComponent},
  { path: '', pathMatch:'full', component: LoginregComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }