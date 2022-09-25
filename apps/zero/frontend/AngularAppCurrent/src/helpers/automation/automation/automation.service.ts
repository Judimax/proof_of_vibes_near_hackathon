
// angular
import { Injectable } from '@angular/core';

// rxjs
import { FormGroup } from '@angular/forms';
import { ENV } from '@core/config/configs';

// services
import { UtilityService } from '@core/utility/utility.service';

// misc
import { environment  as env } from '@environment/environment.dev';

// wml-components
import { WmlDropdownOptionsMeta } from '@shared/wml-components/wml-dropdown/wml-dropdown-option/wml-dropdown-option.component';

@Injectable({
  providedIn: 'root'
})
export class AutomationService {

  constructor(
    private utilService:UtilityService,
  ) { }


  documentQuerySelector(selector:string){
    return document.querySelector(selector) as HTMLElement
  }




}
