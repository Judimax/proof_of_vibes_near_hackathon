import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { TeamMainComponent } from './team-main/team-main.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    TeamMainComponent
  ],
  imports: [
    CommonModule,
    TeamRoutingModule,
    SharedModule
  ]
})
export class TeamModule { }
