import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';

// IMPORT ROUTING HERE
import { LoginregComponent } from './loginreg/loginreg.component';
import { HomeComponent } from './home/home.component';
// END IMPORT ROUTING

const routes: Routes = [
  {path: 'home',component: HomeComponent},
  {path: 'loginreg',component: LoginregComponent},
  { path: '', pathMatch:'full', component: LoginregComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'add', component: AddComponent},
  {path: 'greetup/:id', component: ViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }