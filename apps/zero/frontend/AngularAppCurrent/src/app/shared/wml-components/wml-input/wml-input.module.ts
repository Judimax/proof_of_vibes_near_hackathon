import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WmlInputComponent } from './wml-input.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    WmlInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class WmlInputModule { }
