// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';

// rxjs
import { BehaviorSubject, Subject } from 'rxjs';
import { concatMap, filter, finalize, takeUntil,takeWhile,tap } from 'rxjs/operators';

// misc
import { ENV } from '@app/core/config/configs';
import { NotifyBannerComponent, NotifyBannerMeta } from '../notify-banner/notify-banner.component';
import { GetUsersPlaylistSuccessUIModel, SpotifyService } from '@shared/services/spotify/spotify.service';

// wml-components
import { WMLCustomComponent, WMLImage } from '@windmillcode/wml-components-base';
import { WmlNotifyBarModel, WmlNotifyBarType, WmlNotifyService } from '@windmillcode/wml-notify';

// ngrx
import { SpotifyActions, SpotifySelectors } from '@shared/store/spotify';
import { AppState } from '@shared/store/shared.states';
import { Store } from '@ngrx/store';
import { NiblsIsPresentParams } from '../../../../../projects/nibls-is-present/src/public-api';

@Component({
  selector: 'app-spotify-playlists',
  templateUrl: './spotify-playlists.component.html',
  styleUrls: ['./spotify-playlists.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class SpotifyPlaylistsComponent  {

  constructor(
    public cdref:ChangeDetectorRef,
    public utilService:UtilityService,
    public configService:ConfigService,
    public baseService:BaseService,
    public route: ActivatedRoute,
    public spotifyService:SpotifyService,
    public store:Store<AppState>,
    public wmlNotifyService:WmlNotifyService
  ) { }
  classPrefix = this.utilService.generateClassPrefix('SpotifyPlaylists')  
  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub= new Subject<void>()  
  @Input('myParams')
  myParams!: SpotifyPlaylistsParams

  spotifyPlaylists:Array<WMLImage> = []

  ngOnInit(): void {
    this.getUsersPlaylistFromSpotify().subscribe()
    this.checkForSpotifyAccessToken().subscribe()
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }  

  checkForSpotifyAccessToken(){
    return this.route.queryParams
    .pipe(
      takeWhile((res)=>{
        
        return res['spotify_access_token'] ? false : true
      },true),
      filter((res)=> res['spotify_access_token']),
      takeUntil(this.ngUnsub),
      tap((res)=>{
        this.store.dispatch(
          SpotifyActions.updateSpotifyAccessToken({
            access_token:res['spotify_access_token']
          })
        )
      })
    )
  }

  getUsersPlaylistFromSpotifySuccess =(accessToken:string)=>(res:GetUsersPlaylistSuccessUIModel  )=>{
            
    this.spotifyPlaylists = 
    res.items
    .map((playlist)=>{
      return new WMLImage({
        value: playlist?.name,
        src:playlist?.images[0]?.url ?? "assets/media/app/0.png",
        alt:playlist?.name,
        click:()=>{
          this.addItemToSpotifyPlaylist(accessToken, playlist).subscribe();;
        }
      })
    })
    this.myParams.isPresentSubj.next(new NiblsIsPresentParams({isPresent:true}))
    this.cdref.detectChanges()
  }
  getUsersPlaylistFromSpotify(){
    return this.store.select(SpotifySelectors.getSpotifyAccessToken)
    .pipe(
      takeUntil(this.ngUnsub),
      filter((accessToken)=> accessToken !== "" ),
      concatMap((accessToken)=>{
        return this.spotifyService.getUsersPlaylists(accessToken)
        .pipe(
          // @ts-ignore
          tap(this.getUsersPlaylistFromSpotifySuccess(accessToken))
        )
      })
    )
  }

  addItemToSpotifyPlaylistSuccess = (res) => {
    if (res === ENV.endpointMsgCodes.success) {
      let success = new WmlNotifyBarModel({
        type: WmlNotifyBarType.Success,
        msgtype: "custom",
        custom: new WMLCustomComponent({
          cpnt: NotifyBannerComponent,
          meta: new NotifyBannerMeta({
            i18nKey: "spotify.topOfTheLeagueAddedSucess"
          })
        })
      });
      this.wmlNotifyService.create(success);
    }

  }
  addItemToSpotifyPlaylistError =(err) => {
    let error = new WmlNotifyBarModel({
      type: WmlNotifyBarType.Error,
      msgtype: "custom",
      custom: new WMLCustomComponent({
        cpnt: NotifyBannerComponent,
        meta: new NotifyBannerMeta({
          i18nKey: "spotify.topOfTheLeagueAddedFail"
        })
      })
    });
    this.wmlNotifyService.create(error);
  }
  addItemToSpotifyPlaylist = (accessToken:string,playlist:GetUsersPlaylistSuccessUIModel['items'][number]) =>{
    return this.spotifyService.addItemToPlayList(
      accessToken, playlist.id, ENV.spotify.topOfTheLeagueURI
    )
    .pipe(
      takeUntil(this.ngUnsub),
      tap(
        this.addItemToSpotifyPlaylistSuccess,
        this.addItemToSpotifyPlaylistError,
      ),
      finalize(()=>{

        this.myParams.isPresentSubj.next(new NiblsIsPresentParams());
        this.cdref.detectChanges();
      })
    )

  }

}

export class SpotifyPlaylistsParams {
  constructor(params:Partial<SpotifyPlaylistsParams>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  isPresentSubj= new BehaviorSubject<NiblsIsPresentParams>(new NiblsIsPresentParams())
}