// testing
import { ComponentFixture } from '@angular/core/testing';
import { configureTestingModuleForComponents, grabComponentInstance, mockTranslateService } from '@app/core/utility/test-utils';
import { WMLField } from '../wml-fields/wml-fields.component';

import { WmlInputComponent, WmlInputMeta } from './wml-input.component';

describe('WmlInputComponent', () => {
  let cpnt: WmlInputComponent;
  let fixture: ComponentFixture<WmlInputComponent>;

  beforeEach(async () => {
    await configureTestingModuleForComponents(WmlInputComponent,{mockTranslateService});
    ({fixture, cpnt} =  grabComponentInstance(WmlInputComponent));
    cpnt.meta = new WmlInputMeta({
      wmlField:new WMLField({
        type:"custom",
        custom:{
          "selfType":"standalone",
          "fieldFormControlName":"duchess"
        }
      })
    }) 
    fixture.detectChanges()
  })

  describe("init", () => {

    it("should create", () => {
      expect(cpnt).toBeTruthy()
    })  

    it("should have all values initalize properly", () => {

    })

    it("should have all properties be the correct class instance", () => {
      expect(cpnt.meta).toBeInstanceOf(WmlInputMeta)
    })
  })
});
