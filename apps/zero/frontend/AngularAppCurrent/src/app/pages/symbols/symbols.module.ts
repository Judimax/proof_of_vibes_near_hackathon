// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SymbolsMainComponent } from './symbols-main/symbols-main.component';
import { SymbolsRoutingModule } from './symbols-routing.module';

// shared
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    SymbolsMainComponent
  ],
  imports: [
    CommonModule,
    SymbolsRoutingModule,
    SharedModule
  ]
})
export class SymbolsModule { }
