// testing
import { ChangeDetectorRefExtension, configureTestingModuleForServices } from '@core/utility/test-utils';
import { TestBed } from '@angular/core/testing';

// services
import { UtilityService } from '@core/utility/utility.service';


import { BaseService } from './base.service';
import { ChangeDetectorRef, ViewRef } from '@angular/core';

// rxjs
import { Subject,MonoTypeOperatorFunction } from 'rxjs';

fdescribe('BaseService', () => {
  let service: BaseService;
  let utilService:UtilityService


  beforeEach(() => {
    service = configureTestingModuleForServices(BaseService)
    utilService =TestBed.inject(UtilityService)
    service.appCdRef = new ChangeDetectorRefExtension()
  });

  describe("init", () => {

    it("should create", () => {
      expect(service).toBeTruthy()
    })  

    it("should have all values initalize properly", () => {
    })

    it("should have all properties be the correct class instance", () => {
      expect(service.appCdRef).toBeInstanceOf(ChangeDetectorRef)
      expect(service.toggleOverlayLoadingSubj).toBeInstanceOf(Subject)
      expect(service.playSiteAudioSubj).toBeInstanceOf(Subject)
      expect(service.toggleMobileNavSubj).toBeInstanceOf(Subject)      
    })
  })

  describe("toggleOverlayLoadingSubj",()=>{

    // this test work but the actual logic is very synchonous, try to use the obs$ .source & .operation properties to run the test
    it(` when called | 
     as appropriate | 
     does the required action `,()=>{
      // arrange
      spyOn(service.appCdRef,"detectChanges")

      // act
      service.toggleOverlayLoadingSubj.next(true)

  
      // assert
      expect(service.appCdRef.detectChanges).toHaveBeenCalled()

    })
  })
});
