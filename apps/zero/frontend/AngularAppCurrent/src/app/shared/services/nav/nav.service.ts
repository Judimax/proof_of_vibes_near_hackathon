// angular
import { Inject, Injectable } from '@angular/core';
// services
import { BaseService } from '@core/base/base.service';

// misc
import { ENV } from '@core/config/configs';
import { LinkedList } from '@core/utility/utils';
import { WMLButton } from '@windmillcode/wml-components-base';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor(
    public baseService:BaseService,
  ) { }

  mainAudio = (()=>{
    let audio = new Audio("assets/media/nav_1.mp3")
    audio.loop = true;
    return audio
  })()
  mainAudioToggleOptions= (()=>{
    let on = {
      value:"nav.topLeft.pauseSiteAudio",
      isPlaying:true
    }
    let off = {
      value:"nav.topLeft.playSiteAudio",
      isPlaying:false      
    }
    let linkedList:LinkedList<NavIsPlaying> = new LinkedList(on);
    linkedList.addNode(off);
    return linkedList

  })();
  mainAudioCurrentOption = this.mainAudioToggleOptions.getHead() 
  
  toggleMainAudio = (audioBtn:WMLButton)=>()=>{
    let shouldPlay = this.mainAudioCurrentOption.val.isPlaying

    if(shouldPlay){
      this.mainAudio.play();
    }
    else{
      this.mainAudio.pause();
    }
    this.baseService.playSiteAudioSubj.next(
      this.mainAudioCurrentOption.val.isPlaying 
    )
    audioBtn.value = this.mainAudioCurrentOption.val.value
    if(this.mainAudioCurrentOption.next === null){
      this.mainAudioCurrentOption = this.mainAudioToggleOptions.getHead()  
    }
    else{
      this.mainAudioCurrentOption = this.mainAudioCurrentOption.next
    }
  }
  clickSpotifyBtn =()=>{
    window.location.href = (ENV.nav.spotifyLoginEndpoint())
  }
}


export class NavIsPlaying {
  constructor(params:Partial<NavIsPlaying>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  value!:string
  isPlaying!:boolean
}