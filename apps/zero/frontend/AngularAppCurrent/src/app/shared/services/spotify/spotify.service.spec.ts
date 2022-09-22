// testing
import { configureTestingModuleForServices } from '@core/utility/test-utils';
import { TestBed } from '@angular/core/testing';

// services
import { UtilityService } from '@core/utility/utility.service';

import { SpotifyService } from './spotify.service';
import { ENV } from '@core/config/configs';
import { Observable, of } from 'rxjs';

fdescribe('SpotifyService', () => {
  let service: SpotifyService;
  let utilService:UtilityService
  let storeAccessToken ="sadasd"
  let mockHttpClient:any = {
    post:()=>{}
  }

  beforeEach(() => {
    service = configureTestingModuleForServices(
      SpotifyService,
      {mockHttpClient}
,
    )
    utilService =TestBed.inject(UtilityService)
  });

  describe("init", () => {

    it("should create", () => {
      expect(service).toBeTruthy()
    })  

    it("should have all values initalize properly", () => {
    })

    it("should have all properties be the correct class instance", () => {

    })
  })

  describe("getUsersPlaylists",()=>{
    it(` when called | 
     as appropriate | 
     does the required action `,()=>{
      // arrange
      let obs$ 
      spyOn(mockHttpClient,"post").and.returnValue(of(null))

      // act
      obs$ = service.getUsersPlaylists(storeAccessToken)

      // assert
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        ENV.spotify.getUsersPlaylistEndpoint(),
        {
          data:{
            access_token:storeAccessToken
          }
        },      
        {
          withCredentials:true
        },
      )

    })
  })
  

  describe("addItemToPlayList",()=>{
    it(` when called | 
     as appropriate | 
     does the required action `,()=>{
      // arrange
      let obs$:Observable<any> 
      spyOn(mockHttpClient,"post").and.returnValue(of(null))
      let playlistId,itemId = "0"

      // act
      obs$ = service.addItemToPlayList(storeAccessToken,playlistId,itemId)

      // assert
      expect(mockHttpClient.post).toHaveBeenCalledWith(
        ENV.spotify.postItemToPlaylistEndpoint(),
        {
          data:{
            access_token:storeAccessToken,
            playlist_id:playlistId,
            item_id:itemId              
          }
        }
      )

    })
  })


});
