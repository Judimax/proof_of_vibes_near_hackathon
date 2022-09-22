// testing
import { ComponentFixture } from '@angular/core/testing';
import { configureTestingModuleForComponents, grabComponentInstance, mockTranslateService } from '@app/core/utility/test-utils';
import { ScrollBottomPaginationParams } from '@shared/directives/scroll-bottom-pagination-directive/scroll-bottom-pagination.directive';
import { WmlNotifyBarModel } from '@windmillcode/wml-notify';

// rxjs
import { Subject } from 'rxjs';
import { getArticlesAPIModeltoUIModel } from '../transformations/functions';
import { GetArticlesAPIModel } from '../transformations/models/getArticles';

import { MediaMainComponent, MediaMainMediaItems } from './media-main.component';


fdescribe('MediaMainComponent', () => {
  let cpnt: MediaMainComponent;
  let fixture: ComponentFixture<MediaMainComponent>;
  let cpntName = 'MediaMain'

  beforeEach(async () => {
    await configureTestingModuleForComponents(MediaMainComponent, { mockTranslateService });
    ({ fixture, cpnt } = grabComponentInstance(MediaMainComponent));
    fixture.detectChanges()
  })

  describe("init", () => {

    it("should create", () => {
      expect(cpnt).toBeTruthy()
    })

    it("should have all values initalize properly", () => {
      expect(cpnt.myClass).toEqual(cpntName + 'View')
      expect(cpnt.mediaItems).toEqual([])
    })

    it("should have all properties be the correct class instance", () => {
      expect(cpnt.ngUnsub).toBeInstanceOf(Subject<void>)
      expect(cpnt.scrollBottomPaginationParams).toBeInstanceOf(ScrollBottomPaginationParams)
    })
  })

  describe("ngOnDestroy", () => {

    beforeEach(() => {
      spyOn(cpnt.ngUnsub, 'next')
      spyOn(cpnt.ngUnsub, 'complete')
      spyOn(cpnt.wmlNotifyService, "clear")
    })

    it(` when called | 
     as appropriate | 
     does the required action `, () => {
      // act
      cpnt.ngOnDestroy();

      // assert
      expect(cpnt.ngUnsub.next).toHaveBeenCalled();
      expect(cpnt.ngUnsub.complete).toHaveBeenCalled();
      expect(cpnt.wmlNotifyService.clear).toHaveBeenCalled()
    })
  })

  describe("errorNote", () => {
    it(` when called | 
     as appropriate | 
     does the required action `, () => {
      // arrange
      let ntfyBar

      // act
      ntfyBar = cpnt.errorNote()

      // assert
      expect(ntfyBar).toBeInstanceOf(WmlNotifyBarModel)
    })
  })

  describe("populateItemsScrollBottomPaginationParams", () => {
    let apiResult:GetArticlesAPIModel
    beforeEach(()=>{
      apiResult = new GetArticlesAPIModel({
        "code": "OK",
        "data": {
          "data": Array(5)
            .fill(null)
            .map((nullVal, index0) => {
              return {
                "author": "ESPN",
                "content": "Jean-Clair Todibo joined Nice from Barcelona in February 2021. Jonathan Moscrop/Getty Images\r\nNice defender Jean-Clair Todibo was sent off after just nine seconds against Angers in Ligue 1 on Sunday.… [+556 chars]",
                "description": "Nice defender Jean-Clair Todibo was sent off after just nine seconds against Angers in Ligue 1 on Sunday.",
                "publishedAt": "2022-09-18T14:05:00Z",
                "source": {
                  "id": "espn",
                  "name": "ESPN"
                },
                "title": "Nice's Jean-Clair Todibo sent off after just nine seconds",
                "url": "http://espn.go.com/soccer/nice/story/4749495/nices-jean-clair-todibo-sent-off-after-just-nine-seconds",
                "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2022%2F0918%2Fr1063659_1296x729_16%2D9.jpg"
              }
            }),
          "pageNum": 1,
          "pageSize": 5,
          "totalItems": 9,
          "totalPages": 2
        }
      })
    })

    it(` when called | 
     as appropriate | 
     does the required action `, () => {
      // arrange
      spyOn(cpnt.cdref,"detectChanges")
      spyOn(cpnt.mediaItems,"push")
      let uiResult =getArticlesAPIModeltoUIModel(apiResult)
      let data = uiResult.data.map((item) => new MediaMainMediaItems(item))

      // act
      cpnt.scrollBottomPaginationParamsPopulateItems(apiResult)

      // assert
      expect(cpnt.scrollBottomPaginationParams.stopMakingAPICalls).toBeFalse()
      expect(cpnt.cdref.detectChanges).toHaveBeenCalled()
      expect(cpnt.mediaItems.push).toHaveBeenCalledWith(...data)

    })

    it(` when called | 
    and uiResult.pageNum >= uiResult.totalPages | 
    does the required action `, () => {
     // arrange
     spyOn(cpnt.cdref,"detectChanges")
     spyOn(cpnt.mediaItems,"push")
     apiResult.data.pageNum = Infinity
     let uiResult =getArticlesAPIModeltoUIModel(apiResult)
     let data = uiResult.data.map((item) => new MediaMainMediaItems(item))

     // act
     cpnt.scrollBottomPaginationParamsPopulateItems(apiResult)

     // assert
     expect(cpnt.scrollBottomPaginationParams.stopMakingAPICalls).toBeTrue()
     expect(cpnt.cdref.detectChanges).toHaveBeenCalled()
     expect(cpnt.mediaItems.push).toHaveBeenCalledWith(...data)

   })
  })

  describe("scrollBottomPaginationParamsNotifyError",()=>{
    it(` when called | 
     as appropriate | 
     does the required action `,()=>{
      // arrange
      spyOn(cpnt.wmlNotifyService,"create")

      // act
      cpnt.scrollBottomPaginationParamsNotifyError(null,1)

      // assert
      expect(cpnt.wmlNotifyService.create).toHaveBeenCalledTimes(1)
      expect(cpnt.scrollBottomPaginationParams.stopMakingAPICalls).toBeFalse()
    })

    it(` when called | 
     and failedApiCalls > 5 | 
     does the required action `,()=>{
      // arrange
      spyOn(cpnt.wmlNotifyService,"create")
      

      // act
      cpnt.scrollBottomPaginationParamsNotifyError(null,6)

      // assert
      expect(cpnt.wmlNotifyService.create).toHaveBeenCalledTimes(2)
      expect(cpnt.scrollBottomPaginationParams.stopMakingAPICalls).toBeTrue()
    })    
  })

  describe("scrollBottomPaginationParamsUpdateBody",()=>{
    it(` when called | 
     as appropriate | 
     does the required action `,()=>{
      // arrange
      let updateBody
      // act 
      updateBody = cpnt.scrollBottomPaginationParamsUpdateBody()

      // assert
      expect(updateBody).toEqual({
        "data":{
          "page":1
        }
      })
    })
  })
});
