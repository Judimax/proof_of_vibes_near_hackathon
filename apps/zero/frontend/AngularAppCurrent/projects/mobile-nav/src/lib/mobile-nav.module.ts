import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileNavComponent } from './mobile-nav.component';
import { TranslateModule } from '@ngx-translate/core';
import { MobileNavItemComponent } from './mobile-nav-item/mobile-nav-item.component';


let components = [
  MobileNavComponent,
  MobileNavItemComponent
]

@NgModule({
  declarations: [
    ...components,
  ],
  exports:[
    ...components
  ],
  imports: [
    CommonModule,
    TranslateModule
  ]
})
export class MobileNavModule { }
