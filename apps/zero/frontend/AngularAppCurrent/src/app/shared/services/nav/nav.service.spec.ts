// testing
import { configureTestingModuleForServices } from '@core/utility/test-utils';
import { TestBed } from '@angular/core/testing';

// services
import { UtilityService } from '@core/utility/utility.service';

import { NavIsPlaying, NavService } from './nav.service';
import { LinkedList } from '@core/utility/utils';
import { WMLButton } from '@windmillcode/wml-components-base';
import { emptyProps } from '@ngrx/store';
import { ENV } from '@core/config/configs';

fdescribe('NavService', () => {
  let service: NavService;
  let utilService: UtilityService

  beforeEach(() => {
    service = configureTestingModuleForServices(NavService)
    utilService = TestBed.inject(UtilityService)
  });

  describe("init", () => {

    it("should create", () => {
      expect(service).toBeTruthy()
    })

    it("should have all values initalize properly", () => {
      expect(service.mainAudioCurrentOption).toEqual({
        "val": {
          "value": "nav.topLeft.pauseSiteAudio",
          "isPlaying": true
        },
        "next": {
          "val": {
            "value": "nav.topLeft.playSiteAudio",
            "isPlaying": false
          },
          "next": null
        }
      })
    })

    it("should have all properties be the correct class instance", () => {
      expect(service.mainAudio).toBeInstanceOf(Audio)
      expect(service.mainAudioToggleOptions).toBeInstanceOf(LinkedList<NavIsPlaying>)
    })
  })

  describe("toggleMainAudio",()=>{
    it(` when called | 
     as appropriate | 
     does the required action `,()=>{

      // arrange
      spyOn(service.mainAudio,"play")
      let audioBtn = new WMLButton()
      spyOn(service.baseService.playSiteAudioSubj,"next")
      let {isPlaying} = service.mainAudioCurrentOption.val
      let btnValue = service.mainAudioCurrentOption.val.value

      // act
      service.toggleMainAudio(audioBtn)()

      // assert
      expect(service.mainAudio.play).toHaveBeenCalled()
      expect(service.baseService.playSiteAudioSubj.next).toHaveBeenCalledWith(
        isPlaying
      )
      expect(audioBtn.value).toEqual(btnValue)

    })

    it(` when called | 
     and it's toggled to pause site audio | 
     does the required action `,()=>{

      // arrange
      service.mainAudioCurrentOption.val.isPlaying = false
      spyOn(service.mainAudio,"pause")
      let audioBtn = new WMLButton()
      spyOn(service.baseService.playSiteAudioSubj,"next")
      let {isPlaying} = service.mainAudioCurrentOption.val
      let btnValue = service.mainAudioCurrentOption.val.value

      // act
      service.toggleMainAudio(audioBtn)()

      // assert
      expect(service.mainAudio.pause).toHaveBeenCalled()
      expect(service.baseService.playSiteAudioSubj.next).toHaveBeenCalledWith(
        isPlaying
      )
      expect(audioBtn.value).toEqual(btnValue)

    })    
  })

  describe("clickSpotifyBtn",()=>{
    // ISSUE figure out how to get this properly tested
    xit(` when called | 
     as appropriate | 
     does the required action `,()=>{
      // arrange
      (window as any).location = {
        href:""
      }
      // act
      service.clickSpotifyBtn()

      // assert
      expect(window.location.href).toEqual(ENV.nav.spotifyLoginEndpoint())

    })
  })
});
