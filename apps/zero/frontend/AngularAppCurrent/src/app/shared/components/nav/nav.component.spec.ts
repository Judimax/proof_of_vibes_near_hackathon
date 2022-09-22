// testing
import { ComponentFixture } from '@angular/core/testing';
import { configureTestingModuleForComponents, grabComponentInstance, mockTranslateService } from '@app/core/utility/test-utils';
import { WMLButton, WMLImage, WMLRoute } from '@windmillcode/wml-components-base';

// rxjs
import { Subject } from 'rxjs';

import { NavComponent } from './nav.component';


fdescribe('NavComponent', () => {
  let cpnt: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let cpntName = 'Nav'

  beforeEach(async () => {
    await configureTestingModuleForComponents(NavComponent, { mockTranslateService });
    ({ fixture, cpnt } = grabComponentInstance(NavComponent));
    fixture.detectChanges()
  })

  describe("init", () => {

    it("should create", () => {
      expect(cpnt).toBeTruthy()
    })

    it("should have all values initalize properly", () => {
      expect(cpnt.myClass).toEqual(cpntName + 'View')
      expect(cpnt.firstRowButtons).toEqual([
        cpnt.mainAudioButton,
        cpnt.spotifyButton
      ])
    })

    it("should have all properties be the correct class instance", () => {
      expect(cpnt.ngUnsub).toBeInstanceOf(Subject<void>)
      expect(cpnt.mainAudioButton).toBeInstanceOf(WMLButton)
      expect(cpnt.spotifyButton).toBeInstanceOf(WMLButton)
      expect(cpnt.mobileNavMenuIcon).toBeInstanceOf(WMLImage)
      cpnt.mainNavItems
        .forEach((item) => {
          expect(item).toBeInstanceOf(WMLRoute)
        })
    })
  })

  describe("ngOnDestroy", () => {

    beforeEach(() => {
      spyOn(cpnt.ngUnsub, 'next')
      spyOn(cpnt.ngUnsub, 'complete')
    })

    it(` when called | 
     as appropriate | 
     does the required action `, () => {
      // act
      cpnt.ngOnDestroy();

      // assert
      expect(cpnt.ngUnsub.next).toHaveBeenCalled();
      expect(cpnt.ngUnsub.complete).toHaveBeenCalled();
    })
  })
});
