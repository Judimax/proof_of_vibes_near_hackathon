// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';

// rxjs
import { Subject } from 'rxjs';
import { WMLImage } from '@windmillcode/wml-components-base';

@Component({
  selector: 'team-main',
  templateUrl: './team-main.component.html',
  styleUrls: ['./team-main.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class TeamMainComponent  {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService,
    private baseService:BaseService
  ) { }
  classPrefix = this.utilService.generateClassPrefix('TeamMain')  
  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub= new Subject<void>()  

  teamMembers = [
    "https://www.linkedin.com/in/drb-family-business-prvte/",
    "https://www.linkedin.com/in/tramaine-tyson-59734818/",
    "https://www.linkedin.com/in/shawn-smithii/",
    "https://www.linkedin.com/in/zihuiche/",
    "https://www.linkedin.com/in/annabrook314/",
    "https://www.linkedin.com/in/michael-odumosu-a58367b1/",
    "https://www.linkedin.com/in/franklin-monzon-b92a7a34/",
    "https://www.linkedin.com/in/raphael-otache-5a8330231/"
  ]
  .map((linkedInHref,index0)=>{
    let src= "assets/media/team_main/"+index0+".jpg"
    return new TeamMainImage({
      src,
      alt:"teamMain.members."+index0+".imgAlt",
      title: "teamMain.members."+index0+".title",
      desc: "teamMain.members."+index0+".desc",
      linkedInHref,
    })
  })

  updateTeamMembers(){
    let [
      dashawn,
      tramaine,
      shawn,
      jeff,
      anna,
      michael,
      franklin,
      raphael,
    ] = this.teamMembers

    raphael.src =franklin.src = "assets/media/team_main/missing_avatar.png"

  }



  ngOnInit(): void {
    this.updateTeamMembers()

  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }  

}

export class TeamMainImage extends WMLImage {
  constructor(params:Partial<TeamMainImage>={}){
    super();
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  title!:string;
  desc:string ="Team Member Associate" 
  linkedInHref="https://www.linkedin.com"
}