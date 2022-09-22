// angular
import { Injectable } from '@angular/core';

// services
import { UtilityService } from '@core/utility/utility.service';

// rxjs
import { forkJoin } from 'rxjs';
import {tap} from "rxjs/operators";
import { ENV } from './configs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    private utilService:UtilityService,
  ) { }


}
