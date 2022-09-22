// testing
import { ComponentFixture } from '@angular/core/testing';
import { configureTestingModuleForComponents, grabComponentInstance, mockTranslateService } from '@app/core/utility/test-utils';
import { Subject } from 'rxjs';
import { WmlDropdownSampleComponent } from './wml-dropdown-sample.component';

describe('WmlDropdownSampleComponent', () => {
  let cpnt: WmlDropdownSampleComponent;
  let fixture: ComponentFixture<WmlDropdownSampleComponent>;

  beforeEach(async () => {
    await configureTestingModuleForComponents(WmlDropdownSampleComponent,{mockTranslateService});
    ({fixture, cpnt} =  grabComponentInstance(WmlDropdownSampleComponent));
    fixture.detectChanges()
  })

  describe("init", () => {

    it("should create", () => {
      expect(cpnt).toBeTruthy()
    })  


  })


});
