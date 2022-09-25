// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, OnInit, Renderer2, ViewChild } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';

// rxjs
import { Subject } from 'rxjs';
import { takeUntil,tap } from 'rxjs/operators';

// misc
import { ENV } from '@environment/environment';

declare global {
  let mapboxgl:any;
}

@Component({
  selector: 'vibesmap',
  templateUrl: './vibesmap.component.html',
  styleUrls: ['./vibesmap.component.scss'],
  // changeDetection:ChangeDetectionStrategy.OnPush

})
export class VibesmapComponent  {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService,
    private baseService:BaseService,
    private renderer2:Renderer2
  ) { }
  classPrefix = this.utilService.generateClassPrefix('Vibesmap')  
  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub= new Subject<void>()  
  @ViewChild('vibesMap',{static:true,read:ElementRef}) vibesMap
  @ViewChild('smileyFace',{static:true,read:ElementRef}) smileyFace
  map 

  markers 

  ngOnInit(): void {
    this.map  = new mapboxgl.Map({
      accessToken:"pk.eyJ1IjoibWljaGFlbG9kdW1vc3U1NyIsImEiOiJjbDdneHlzYngwMWw1M25teHZ2Yzlpb2RpIn0.cqOqbStIvfCNHGPqWLU_5Q",
      container: this.vibesMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 41],
      zoom: 7
    });


    this.markers = Array(9)
    .fill(null)
    .map((nullVal,index0)=>{
      let markerLng = (this.utilService.generateRandomNumber(100) *.01) + -74.5
      let markerLat = (this.utilService.generateRandomNumber(100) *.01) + 40.5
      console.log(markerLng,markerLat)      
      let img =this.renderer2.createElement("img")
      img.src = "assets/media/shared/smiley_face.webp"
      img.id = "VibesmapPod0Img0"
      img.style = {
        "width": "calc(16/16 * 1rem)",
        "height": "auto"
      }
      return new mapboxgl.Marker({
        element :img
      })
      .setLngLat([markerLng, markerLat])
      .addTo(this.map)
    })

    console.log(this.markers)


  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }  

}
