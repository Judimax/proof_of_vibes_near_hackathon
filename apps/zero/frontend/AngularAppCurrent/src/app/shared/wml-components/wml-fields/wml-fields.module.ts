import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WmlFieldComponent } from './wml-fields.component';
import { WmlLabelComponent } from './wml-label/wml-label.component';


@NgModule({
  declarations: [
    WmlFieldComponent,
    WmlLabelComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    WmlFieldComponent
  ],
})
export class WmlFieldModule { }
