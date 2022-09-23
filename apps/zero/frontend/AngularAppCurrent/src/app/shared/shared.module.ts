// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// wml components
import { WmlComponentsModule } from './wml-components/wml-components.module';

// i18n
import { TranslateModule } from '@ngx-translate/core';

// misc
import { SampleCpntComponent } from './components/sample-cpnt/sample-cpnt.component';
import { DropdownOptionComponent } from './components/dropdown-option/dropdown-option.component';
import { NavComponent } from './components/nav/nav.component';
import { PenroseComponent } from './components/penrose/penrose.component';
import { CustomLabelComponent } from './components/custom-label/custom-label.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScrollBottomPaginationDirective } from './directives/scroll-bottom-pagination-directive/scroll-bottom-pagination.directive';

import { NiblsIsPresentDirective } from '../../../projects/nibls-is-present/src/public-api';
import {  MobileNavModule } from '../../../projects/mobile-nav/src/public-api';
import { MobileNavItemPodComponent } from './components/mobile-nav-item-pod/mobile-nav-item-pod.component';

// wml components
import { WmlNotifyModule } from '@windmillcode/wml-notify';
import { NotifyBannerComponent } from './components/notify-banner/notify-banner.component';

// ngrx
import { StoreModule } from '@ngrx/store';
import { getSpotifyReducer } from './store/spotify/spotify.reducers';
import { QrCodeModule } from 'ng-qrcode';


let components = [
  SampleCpntComponent,
  NavComponent,
  PenroseComponent,
  CustomLabelComponent,
  FooterComponent,
  ScrollBottomPaginationDirective,
  
  MobileNavItemPodComponent,
  
  // lib
  NiblsIsPresentDirective,
  
]

let modules = [
  WmlNotifyModule,
  TranslateModule,
  MobileNavModule,
  QrCodeModule
]
@NgModule({
  imports:[
    ...modules,
    CommonModule,
    RouterModule,
    
    StoreModule.forFeature('spotify', getSpotifyReducer),
  ],
  exports: [
    ...components,
    ...modules,
    WmlComponentsModule,
    HttpClientModule,
  ],
  declarations: [
    ...components,
    DropdownOptionComponent,
    NotifyBannerComponent,
    
  ]  
})
export class SharedModule { }
