import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamMainComponent } from './team-main/team-main.component';

const routes: Routes = [
  {
    path:'',
    component:TeamMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
