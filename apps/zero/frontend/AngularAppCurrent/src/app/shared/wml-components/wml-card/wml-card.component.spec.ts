

// testing
import { ComponentFixture } from '@angular/core/testing';
import { configureTestingModuleForComponents, grabComponentInstance, mockTranslateService } from '@core/utility/test-utils';

// wml components

import { WmlCardComponent } from './wml-card.component';
import { WMLField } from '@shared/wml-components/wml-fields/wml-fields.component';
import { WMLForm } from '@shared/wml-components/wml-form/wml-form.component';

describe('WmlCardComponent', () => {
  let cpnt: WmlCardComponent;
  let fixture: ComponentFixture<WmlCardComponent>;

  beforeEach(async () => {
    await configureTestingModuleForComponents(WmlCardComponent,{mockTranslateService});
    ({fixture, cpnt} =  grabComponentInstance(WmlCardComponent));
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
