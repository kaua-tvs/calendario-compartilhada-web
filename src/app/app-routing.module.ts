import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMembersComponent } from './containers/add-members/add-members.component';
import { HomeComponent } from './containers/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'members',
    component: AddMembersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
