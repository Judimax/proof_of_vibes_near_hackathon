// testing
import { ComponentFixture } from '@angular/core/testing';
import { configureTestingModuleForComponents, grabComponentInstance, mockTranslateService } from '@app/core/utility/test-utils';

// rxjs
import { Subject } from 'rxjs';

import { TeamMainComponent, TeamMainImage } from './team-main.component';


fdescribe('TeamMainComponent', () => {
  let cpnt: TeamMainComponent;
  let fixture: ComponentFixture<TeamMainComponent>;
  let cpntName = "TeamMain"

  beforeEach(async () => {
    await configureTestingModuleForComponents(TeamMainComponent,{mockTranslateService});
    ({fixture, cpnt} =  grabComponentInstance(TeamMainComponent));
    
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
      cpnt.teamMembers.forEach((member)=>{
        expect(member).toBeInstanceOf(TeamMainImage)
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

  describe("updateTeamMembers",()=>{
    it(` when called | 
     as appropriate | 
     does the required action `,()=>{
      // arrange
      let [
        dashawn,
        tramaine,
        shawn,
        jeff,
        anna,
        michael,
        franklin,
        raphael,
      ] = cpnt.teamMembers      
      let missingAvatar = "assets/media/team_main/missing_avatar.png"

      // act
      cpnt.updateTeamMembers()

      // assert
      expect(raphael.src).toEqual(missingAvatar)
      expect(franklin.src).toEqual(missingAvatar)
    })
  })
});
