// testing
import { ComponentFixture } from '@angular/core/testing';
import { configureTestingModuleForComponents, grabComponentInstance, mockTranslateService } from '@app/core/utility/test-utils';

import { WmlFieldComponent } from './wml-fields.component';

describe('WmlFieldsComponent', () => {
  let cpnt: WmlFieldComponent;
  let fixture: ComponentFixture<WmlFieldComponent>;

  beforeEach(async () => {
    await configureTestingModuleForComponents(WmlFieldComponent,{mockTranslateService});
    ({fixture, cpnt} =  grabComponentInstance(WmlFieldComponent));
    fixture.detectChanges()
  })

  describe("init", () => {

    it("should create", () => {
      expect(cpnt).toBeTruthy()
    })  

    it("should have all values initalize properly", () => {
    })

    it("should have all properties be the correct class instance", () => {

    })
  })
});
