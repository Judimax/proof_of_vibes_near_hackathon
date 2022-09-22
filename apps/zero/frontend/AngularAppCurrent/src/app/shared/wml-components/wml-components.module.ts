// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// wml compoennts
import { WmlCardModule } from './wml-card/wml-card.module';
import { WmlFieldModule } from './wml-fields/wml-fields.module';
import { WmlFormModule } from './wml-form/wml-form.module';
import { WmlInputModule } from './wml-input/wml-input.module';
import { WmlDropdownModule } from './wml-dropdown/wml-dropdown.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    WmlCardModule,
    WmlFieldModule,
    WmlFormModule,
    WmlInputModule,
    WmlDropdownModule
  ]
})
export class WmlComponentsModule { }
