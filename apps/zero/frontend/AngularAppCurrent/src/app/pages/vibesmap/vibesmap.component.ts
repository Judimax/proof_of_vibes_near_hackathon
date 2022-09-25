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
import { ENV } from '@environment/environment.dev';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WMLForm } from '@shared/wml-components/wml-form/wml-form.component';
import { WMLButton } from '@windmillcode/wml-components-base';

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
  EDA= {
    title:"EDA Event",
    isPresent:false,
    closeForm:()=>{
      this.EDA.isPresent = false
    }
  } 

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
   
      let img =this.renderer2.createElement("img")
      img.src = "assets/media/shared/smiley_face.webp"
      img.id = "VibesmapPod0Img0"
      img.style = {
        "width": "calc(16/16 * 1rem)",
        "height": "auto"
      }
      let marker = new mapboxgl.Marker({
        element :img
      })
      .setLngLat([markerLng, markerLat])
      .addTo(this.map)

      marker.getElement().addEventListener('click', ($evt) => {
        this.EDA.isPresent = true
        this.EDA.title = "Event "+index0
      });
      return marker
    })




  }

  rootFormGroup = new FormGroup({
    [ENV.vibesMap.fieldFormControlName.energy]: new FormControl(5,[]),
    [ENV.vibesMap.fieldFormControlName.density]: new FormControl(5,[]),
    [ENV.vibesMap.fieldFormControlName.anmity]: new FormControl(5,[]),

  })
  
  energyField = this.baseService.generateRangeFormField(
    "energy",
    ENV.vibesMap.fieldFormControlName.energy,
    this.rootFormGroup,

  )
  densityField = this.baseService.generateRangeFormField(
    "density",
    ENV.vibesMap.fieldFormControlName.density,
    this.rootFormGroup,

  )
  anmityField = this.baseService.generateRangeFormField(
    "anmity",
    ENV.vibesMap.fieldFormControlName.anmity,
    this.rootFormGroup,

  )

  fields= [
    this.energyField,
    this.densityField,
    this.anmityField,    
  ]
  wmlForm = new WMLForm({
    fields: this.fields
  })  

  submitBtn = new WMLButton({
    value:"Submit Your Ratings",
    click:()=>{
      alert("Ratings for" + this.EDA.title + " energy "+ this.rootFormGroup.value['energy']
      + " density "+ this.rootFormGroup.value['density']
      + " anmity "+ this.rootFormGroup.value['anmity']      
      )
      this.EDA.closeForm()
    }
  })

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }  

}
