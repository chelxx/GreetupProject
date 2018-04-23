import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// IMPORT ROUTING HERE
import { LoginregComponent } from './loginreg/loginreg.component';
// END IMPORT ROUTING

const routes: Routes = [
  {path: 'home',component:LoginregComponent},
  { path: '', pathMatch:'full', component: LoginregComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
