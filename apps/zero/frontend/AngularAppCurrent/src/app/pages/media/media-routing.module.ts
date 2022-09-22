import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  MediaMainComponent } from './media-main/media-main.component';

const routes: Routes = [
  {
    path:'',
    component:MediaMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaRoutingModule { }
