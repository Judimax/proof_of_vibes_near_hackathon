// angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// misc
import { ENV } from '@core/config/configs';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(
    public http:HttpClient
  ) { }

  getUsersPlaylists(accessToken:string,raw = false){
    return this.http.post(
      ENV.spotify.getUsersPlaylistEndpoint(),
      {
        data:{
          access_token:accessToken
        }
      },      
      {
        withCredentials:true
      },
    )
    .pipe(
      raw ? tap() : map(getUsersPlaylistsSuccess)
    )
  }

  addItemToPlayList(accessToken:string,playlistId:string,itemId:string,raw= false){
    return this.http.post(
      ENV.spotify.postItemToPlaylistEndpoint(),
      {
        data:{
          access_token:accessToken,
          playlist_id:playlistId,
          item_id:itemId              
        }
      }
    )
    .pipe(
      raw ? tap() : map(addItemToPlayListSuccess)
    )    
  }

}

let getUsersPlaylistsSuccess= (apiBody)=>{
  let uiBody:GetUsersPlaylistSuccessUIModel = new GetUsersPlaylistSuccessUIModel({
    items:apiBody.data.playlists
  })
  

  return uiBody
}

let addItemToPlayListSuccess = (apiBody)=>{
  let uiBody = apiBody.code
  return uiBody
}

export class GetUsersPlaylistSuccessUIModel{ 
  items!:Array<{
    "collaborative": boolean,
    "description": string,
    "external_urls": {
        "spotify": string
    },
    "href": string,
    "id": string,
    "images": Array<{
      "height": number,
      "url": string,
      "width": number
    }>,
    "name": string,
    "owner": {
        "display_name": string,
        "external_urls": {
            "spotify": string
        },
        "href": string,
        "id": string,
        "type": string,
        "uri": string
    },
    "primary_color": string,
    "public": boolean,
    "snapshot_id": string,
    "tracks": {
        "href": string,
        "total": number
    },
    "type": "playlist",
    "uri": string
}>
  constructor(params:Partial<GetUsersPlaylistSuccessUIModel>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
}