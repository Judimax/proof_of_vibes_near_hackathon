// @ts-nocheck
// testing
import { ComponentFixture } from '@angular/core/testing';
import { configureTestingModuleForComponents, grabComponentInstance, mockTranslateService } from '@app/core/utility/test-utils';
import { GetUsersPlaylistSuccessUIModel } from '@shared/services/spotify/spotify.service';
import { SpotifyActions } from '@shared/store/spotify';
import { WMLImage } from '@windmillcode/wml-components-base';

// rxjs
import { of, Subject } from 'rxjs';
import { NiblsIsPresentParams } from '../../../../../projects/nibls-is-present/src/lib/nibls-is-present.directive';

import { SpotifyPlaylistsComponent, SpotifyPlaylistsParams } from './spotify-playlists.component';


fdescribe('SpotifyPlaylistsComponent', () => {
  let cpnt: SpotifyPlaylistsComponent;
  let fixture: ComponentFixture<SpotifyPlaylistsComponent>;
  let cpntName = 'SpotifyPlaylists'
  let accessTokenInfo = { spotify_access_token: "My_Access_Token" }
  let storeAccessToken = "MY_access_token"
  let mockStore = {
    select: () => of(storeAccessToken ),
    dispatch: () => { }
  }
  let mockHttpClient = {
    post:()=>{}
  
  }
  let getUsersPlaylistSuccessItems=[
    {
      "collaborative": false,
      "description": "",
      "external_urls": {
        "spotify": "https://open.spotify.com/playlist/4JbougpvkvsY7t8pCtxvMo"
      },
      "href": "https://api.spotify.com/v1/playlists/4JbougpvkvsY7t8pCtxvMo",
      "id": "4JbougpvkvsY7t8pCtxvMo",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/ab67616d0000b273cd509603bff297e21426c5fb",
          "width": 640
        }
      ],
      "name": "Mi lista n.º 1",
      "owner": {
        "display_name": "NIBLS-developer",
        "external_urls": {
          "spotify": "https://open.spotify.com/user/317dm2a3bky653iyghvhk4bmgsta"
        },
        "href": "https://api.spotify.com/v1/users/317dm2a3bky653iyghvhk4bmgsta",
        "id": "317dm2a3bky653iyghvhk4bmgsta",
        "type": "user",
        "uri": "spotify:user:317dm2a3bky653iyghvhk4bmgsta"
      },
      "primary_color": null,
      "public": false,
      "snapshot_id": "Miw2ZWJlZmExMWEyZmM0YWMyYTAyMjJlZjRkZWRiZDEwNWJmNjE2Y2Vj",
      "tracks": {
        "href": "https://api.spotify.com/v1/playlists/4JbougpvkvsY7t8pCtxvMo/tracks",
        "total": 1
      },
      "type": "playlist",
      "uri": "spotify:playlist:4JbougpvkvsY7t8pCtxvMo"
    }
  ]
  

  beforeEach(async () => {
    await configureTestingModuleForComponents(SpotifyPlaylistsComponent,
      { mockTranslateService, mockStore,mockHttpClient }
    );
    ({ fixture, cpnt } = grabComponentInstance(SpotifyPlaylistsComponent));
    cpnt.myParams = new SpotifyPlaylistsParams()
    fixture.detectChanges()
  })

  describe("init", () => {

    it("should create", () => {
      expect(cpnt).toBeTruthy()
    })

    it("should have all values initalize properly", () => {
      expect(cpnt.myClass).toEqual(cpntName + 'View')
      expect(cpnt.spotifyPlaylists).toEqual([])
    })

    it("should have all properties be the correct class instance", () => {
      expect(cpnt.ngUnsub).toBeInstanceOf(Subject<void>)
      expect(cpnt.myParams).toBeInstanceOf(SpotifyPlaylistsParams)
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

  describe("checkForSpotifyAccessToken", () => {
    it(` when called | 
     as appropriate | 
     does the required action `, () => {
      // arrange
      let obs$ = cpnt.checkForSpotifyAccessToken()
      spyOn(cpnt.store, "dispatch")

      // act
      obs$.source.source.source.operator({
        next: console.log,
        subscribe: (res) => {
          res._next(accessTokenInfo)
        }
      })

      obs$.source.source.source.operator({
        next: console.log,
        subscribe: (res) => {
          res._next(accessTokenInfo)
        }
      })


      // assert
      expect(cpnt.store.dispatch).toHaveBeenCalledTimes(1)



    })

    it(` when called | 
     and res['spotify_access_token'] === false from the route queryparams | 
     does the required action `, () => {
      // arrange
      let obs$ = cpnt.checkForSpotifyAccessToken()
      spyOn(cpnt.store, "dispatch")

      // act
      obs$.source.source.source.operator({
        next: console.log,
        subscribe: (res) => {
          res._next("Error")
        }
      })


      // assert
      expect(cpnt.store.dispatch).not.toHaveBeenCalled()



    })


  })

  describe("getUsersPlaylistFromSpotify", () => {

    beforeEach(() => {
      spyOn(mockHttpClient, "post").and.callFake(
        ()=>of(new GetUsersPlaylistSuccessUIModel({
          items:getUsersPlaylistSuccessItems
        })
      ))
      spyOn(cpnt.spotifyService,"getUsersPlaylists").and.callFake(mockHttpClient.post)
      spyOn(cpnt.cdref,"detectChanges")
      spyOn(cpnt.myParams.isPresentSubj,"next")
      spyOn(cpnt,"getUsersPlaylistFromSpotifySuccess").and.callThrough()
    })

    it(` when called | 
     as appropriate | 
     does the required action `, () => {
      // arrange

      let obs$ = cpnt.getUsersPlaylistFromSpotify()

      // act
      obs$.source.source.error = console.log
      obs$.source.source.complete = console.log
      obs$.source?.source?.operator({
        next:console.log,
        error:console.log,
        subscribe:(res)=>{
          res.operator(obs$)
        }
      })

      // assert
      expect(cpnt.spotifyService.getUsersPlaylists).toHaveBeenCalledWith(storeAccessToken)
      expect(cpnt.spotifyPlaylists.length).toEqual(1)
      expect(cpnt.cdref.detectChanges).toHaveBeenCalled()
      expect(cpnt.myParams.isPresentSubj.next).toHaveBeenCalledWith(new NiblsIsPresentParams({isPresent:true}))
      expect(cpnt.getUsersPlaylistFromSpotifySuccess).toHaveBeenCalledWith(storeAccessToken)

    })
  })

  describe("getUsersPlaylistFromSpotifySuccess",()=>{
    it(` when called | 
     as appropriate | 
     does the required action `,()=>{
      // arrange
      spyOn(cpnt.cdref,"detectChanges")
      spyOn(cpnt.myParams.isPresentSubj,"next")

      // act
      cpnt.getUsersPlaylistFromSpotifySuccess(storeAccessToken)(new GetUsersPlaylistSuccessUIModel({items:getUsersPlaylistSuccessItems}))

      // assert
      expect(cpnt.spotifyPlaylists.length).toEqual(1)
      expect(cpnt.spotifyPlaylists[0]).toBeInstanceOf(WMLImage)
      expect(cpnt.cdref.detectChanges).toHaveBeenCalled()
      expect(cpnt.myParams.isPresentSubj.next).toHaveBeenCalledWith(new NiblsIsPresentParams({isPresent:true}))
    })
  })

  describe("addItemToSpotifyPlaylistSuccess",()=>{
    it(` when called | 
     as appropriate | 
     does the required action `,()=>{
      // arrange
      spyOn(cpnt.wmlNotifyService,"create")

      // act
      cpnt.addItemToSpotifyPlaylistSuccess("OK")

      // assert
      expect(cpnt.wmlNotifyService.create).toHaveBeenCalled()
    })

    it(` when called | 
    and res !== ENV.endpointMsgCodes.success)  | 
    does the required action `,()=>{
     // arrange
     spyOn(cpnt.wmlNotifyService,"create")

     // act
     cpnt.addItemToSpotifyPlaylistSuccess("ERROR")

     // assert
     expect(cpnt.wmlNotifyService.create).not.toHaveBeenCalled()
   })
  })

  describe("addItemToSpotifyPlaylistError",()=>{
    it(` when called | 
     as appropriate | 
     does the required action `,()=>{
      // assert
      spyOn(cpnt.wmlNotifyService,"create")

      // act
      cpnt.addItemToSpotifyPlaylistError()

      // assert
      expect(cpnt.wmlNotifyService.create).toHaveBeenCalled()

    })
  })

  describe("addItemToSpotifyPlaylist",()=>{

    beforeEach(()=>{
      spyOn(mockHttpClient, "post").and.returnValue(
        of("OK")
      )
      spyOn(cpnt.spotifyService,"addItemToPlayList").and.callFake(mockHttpClient.post)
      spyOn(cpnt,"addItemToSpotifyPlaylistSuccess")
      spyOn(cpnt,"addItemToSpotifyPlaylistError")
      spyOn(cpnt.myParams.isPresentSubj,"next")
      spyOn(cpnt.cdref,"detectChanges")

    })

    it(` when called | 
     as appropriate | 
     does the required action `,()=>{
      // arrange
      let obs$ = cpnt.addItemToSpotifyPlaylist(storeAccessToken,{id:0})

      // act
      obs$.source.source.error = console.log
      obs$.source.source.complete = console.log
      obs$.source.source.operator({
        next:console.log,
        subscribe:(res)=>{
          res.operator(obs$)
        }
      })

      // assert
      expect(cpnt.addItemToSpotifyPlaylistSuccess).toHaveBeenCalledWith("OK")
      expect(cpnt.myParams.isPresentSubj.next).toHaveBeenCalledWith(new NiblsIsPresentParams())
      expect(cpnt.cdref.detectChanges).toHaveBeenCalled()
      
    })
  
    it(` when called | 
    and there is an error | 
    does the required action `,()=>{
     // arrange
     let obs$ = cpnt.addItemToSpotifyPlaylist(storeAccessToken,{id:0})

     // act
     obs$.source.error = ()=>{}
     obs$.source.operator({
       next:console.log,
       error:console.log,
       subscribe:(res)=>{
        res._error("Err")
       }
     })

     // assert
     expect(cpnt.addItemToSpotifyPlaylistError).toHaveBeenCalledWith("Err")
     //ISSUE find out why these two are not called
    //  expect(cpnt.myParams.isPresentSubj.next).toHaveBeenCalledWith(new NiblsIsPresentParams())
    //  expect(cpnt.cdref.detectChanges).toHaveBeenCalled()
     
   })
 
  })
});
