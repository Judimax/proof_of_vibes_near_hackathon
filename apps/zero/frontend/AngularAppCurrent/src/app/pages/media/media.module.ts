import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaMainComponent } from './media-main/media-main.component';
import { MediaRoutingModule } from './media-routing.module';
import { SharedModule } from '@shared/shared.module';
import {WmlNotifyModule} from '@windmillcode/wml-notify';

// material


@NgModule({
  declarations: [
    MediaMainComponent
  ],
  imports: [
    CommonModule,
    MediaRoutingModule,
    SharedModule,
    
  ]
})
export class MediaModule { }
