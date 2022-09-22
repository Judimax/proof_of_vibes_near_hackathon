import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingMainComponent } from './landing-main/landing-main.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    LandingMainComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule
  ]
})
export class LandingModule { }
