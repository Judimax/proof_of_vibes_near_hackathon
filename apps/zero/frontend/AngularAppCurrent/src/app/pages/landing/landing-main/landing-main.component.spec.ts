// testing
import { ChangeDetectorRef, ViewRef } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { ChangeDetectorRefExtension, configureTestingModuleForComponents, grabComponentInstance, mockTranslateService } from '@app/core/utility/test-utils';

// services
import { BaseService } from '@core/base/base.service';
import { ConfigService } from '@core/config/config.service';
import { WMLImage } from '@windmillcode/wml-components-base';

// rxjs
import { Subject } from 'rxjs';

import { LandingMainComponent } from './landing-main.component';



fdescribe('LandingMainComponent', () => {
  let cpnt: LandingMainComponent;
  let fixture: ComponentFixture<LandingMainComponent>;
  const cpntName = "LandingMain"
  let mockCdref = new ChangeDetectorRefExtension()


  beforeEach(async () => {
    await configureTestingModuleForComponents(
      LandingMainComponent,
      {mockTranslateService,mockCdref}
      );
    ({fixture, cpnt} =  grabComponentInstance(LandingMainComponent));
    fixture.detectChanges()
  })

  describe("init", () => {

    it("should create", () => {
      expect(cpnt).toBeTruthy()
    })  

    it("should have all values initalize properly", () => {
      expect(cpnt.myClass).toEqual(cpntName+'View')
    })

    it("should have all properties be the correct class instance", () => {
      expect(cpnt.ngUnsub).toBeInstanceOf(Subject<void>)
      // expect((cpnt as any).cdref).toBeInstanceOf(ChangeDetectorRef)
      expect((cpnt as any).configService).toBeInstanceOf(ConfigService)
      expect((cpnt as any).baseService).toBeInstanceOf(BaseService)
      cpnt.marqueeImages.forEach((image)=>{
        expect(image).toBeInstanceOf(WMLImage)
      })
    })
  })

  describe("ngOnDestroy",()=>{

    beforeEach(()=>{
      spyOn(cpnt.ngUnsub,'next')
      spyOn(cpnt.ngUnsub,'complete')
    })
    
    it(` when called | 
     as appropriate | 
     does the required action `,()=>{
        // act
        cpnt.ngOnDestroy();

        // assert
        expect(cpnt.ngUnsub.next).toHaveBeenCalled();
        expect(cpnt.ngUnsub.complete).toHaveBeenCalled();
    })
  })

  describe("ngAfterViewInit",()=>{
  
    it(` when called | 
     as appropriate | 
     does the required action `,()=>{
      // arrange
      spyOn(cpnt,"initMarquee")

      // act
      cpnt.ngAfterViewInit()

      // assert
      expect(cpnt.initMarquee).toHaveBeenCalled()
    })
  })


});
