// testing
import { ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestingModuleForComponents, grabComponentInstance, mockTranslateService } from '@app/core/utility/test-utils';
import { UtilityService } from '@core/utility/utility.service';
import { addCustomComponent } from '@shared/wml-components/functions';
import { Observable, Subject } from 'rxjs';
import { WmlDropdownParentSubjParams } from '../wml-dropdown.component';

import { WmlDropdownOptionComponent, WmlDropdownOptionsMeta } from './wml-dropdown-option.component';

describe('WmlDropdownOptionComponent', () => {
  let cpnt: WmlDropdownOptionComponent;
  let fixture: ComponentFixture<WmlDropdownOptionComponent>;
  let utilService:UtilityService


  beforeEach(async () => {
    await configureTestingModuleForComponents(WmlDropdownOptionComponent, { mockTranslateService });
    ({ fixture, cpnt } = grabComponentInstance(WmlDropdownOptionComponent));
    utilService = TestBed.inject(UtilityService)
    fixture.detectChanges()
  })


  describe("init", () => {

    it("should create", () => {
      expect(cpnt).toBeTruthy()
    })

    it("should have all values initalize properly", () => {
      expect(cpnt.myClass).toEqual('View')
    })

    it("should have all properties be the correct class instance", () => {
      expect(cpnt.meta).toBeInstanceOf(WmlDropdownOptionsMeta)
      expect(cpnt.ngUnsub).toBeInstanceOf(Subject<void>)
      expect(cpnt.customOption).toBeInstanceOf(ViewContainerRef)

    })
  })

  describe("initComponent", () => {

    // let addCustomCpnt =jasmine.createSpy('addCustomCpnt',addCustomComponent).and.callThrough()
    let obj = { addCustomComponent }
    let spy1 = jasmine.createSpy('spy1', addCustomComponent).and.callThrough()
    beforeEach(() => {

      spyOn(obj, 'addCustomComponent')
      spyOn(cpnt,"subscribeToCommunicateWithRootSubj")
    })
    it(` when called | 
     as appropriate | 
     does the required action `, () => {

      // act
      cpnt.initComponent();
      cpnt.meta._rootIsReadySubj.next();

      // assert
      /**
       *@TODO  learn how to spy on standolone fns
        expect( spy1).toHaveBeenCalled();
      */
     expect(cpnt.subscribeToCommunicateWithRootSubj).toHaveBeenCalled();
    })
  })

  describe("ngAfterViewInit", () => {

    beforeEach(() => {
      spyOn(cpnt, 'initComponent')
      spyOn(cpnt, 'initUpdateComponent')
    })

    it(` when called | 
     as appropriate | 
     does the required action `, () => {

      // act
      cpnt.ngAfterViewInit()

      // assert
      let changeDetectorRef = fixture.debugElement.injector.get(ChangeDetectorRef);
      expect(cpnt.meta.view.cdref).toEqual(changeDetectorRef)
      expect(cpnt.initComponent).toHaveBeenCalled()
      expect(cpnt.initUpdateComponent).toHaveBeenCalled()

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

  describe("onMouseover", () => {



    it(` when called | 
     as appropriate | 
     does the required action `, () => {
      // arrange
      cpnt.meta.type = 'select'
      spyOn(cpnt.meta.communicateWithParentSubj,"next")
      spyOn(cpnt,"onMouseover").and.callThrough()

      // act
      utilService.eventDispatcher("mousemove",fixture.nativeElement)

      // assert
      expect(cpnt.onMouseover).toHaveBeenCalled()
      expect(cpnt.meta.communicateWithParentSubj.next).toHaveBeenCalledWith(
        new WmlDropdownParentSubjParams({
          type:"showDropdown",
          option:cpnt.meta
        })
      )
      

    })
    it(` when called | 
    !["select"].includes(this.meta.type)   | 
    does the required action `, () => {
     // arrange
     cpnt.meta.type = 'option'
     spyOn(cpnt.meta.communicateWithParentSubj,"next")
     spyOn(cpnt,"onMouseover").and.callThrough()

     // act
     utilService.eventDispatcher("mousemove",fixture.nativeElement)

     // assert
     expect(cpnt.onMouseover).toHaveBeenCalled()
     expect(cpnt.meta.communicateWithParentSubj.next).not.toHaveBeenCalled()
     

   })
  })

  describe("onMouseOut", () => {

    it(` when called | 
     as appropriate | 
     does the required action `, () => {
      // arrange
      spyOn(cpnt.meta.communicateWithParentSubj,"next")
      spyOn(cpnt,"onMouseOut").and.callThrough()

      // act
      utilService.eventDispatcher("mouseout",fixture.nativeElement)

      // assert
      expect(cpnt.onMouseOut).toHaveBeenCalled()
      expect(cpnt.meta.communicateWithParentSubj.next).toHaveBeenCalledWith(
        new WmlDropdownParentSubjParams({
          type: "hideDropdown",
        })
      )
      

    })

  })

  describe("subscribeToCommunicateWithRootSubj",()=>{
  
    it(` when called | 
     as appropriate | 
     does the required action `,()=>{
      // arrange
      cpnt.meta._root = true

      // act
      let obs$ = cpnt.subscribeToCommunicateWithRootSubj()

      // assert
      expect(obs$).toBeInstanceOf(Observable)

    })

    it(` when called | 
     and this.meta.communicateWithRootOptionSubj.next | 
     does the required action `,()=>{
      // arrange
      cpnt.meta._root = true
      spyOn(cpnt.customOption,"clear")
      let obs$ = cpnt.subscribeToCommunicateWithRootSubj()
      obs$?.subscribe()

      // act
      cpnt.meta.communicateWithRootOptionSubj.next(new WmlDropdownParentSubjParams({
        type:"showDropdown",
        option:cpnt.meta
      }))

      // assert
      expect(cpnt.customOption.clear).toHaveBeenCalled()
      
      /** 
       *@TODO figre out how to test addCustomComponent
      */

    })    

    it(` when called | 
     and !this.meta._root | 
     does the required action `,()=>{
      // arrange
      cpnt.meta._root = false

      // act
      let obs$ = cpnt.subscribeToCommunicateWithRootSubj()

      // assert
      expect(obs$).toEqual(null)

    })    
  })


});
