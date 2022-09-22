import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SymbolsMainComponent } from './symbols-main/symbols-main.component';

const routes: Routes = [
  {
    path:'',
    component:SymbolsMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SymbolsRoutingModule { }
