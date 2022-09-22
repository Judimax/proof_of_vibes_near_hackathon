import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WmlFormComponent } from './wml-form.component';
import { WmlCardModule } from '../wml-card/wml-card.module';
import { WmlFieldModule } from '../wml-fields/wml-fields.module';



@NgModule({
  declarations: [
    WmlFormComponent
  ],
  imports: [
    CommonModule,
    WmlCardModule,
    WmlFieldModule
  ],
  exports:[
    WmlFormComponent 
  ]
})
export class WmlFormModule { }
