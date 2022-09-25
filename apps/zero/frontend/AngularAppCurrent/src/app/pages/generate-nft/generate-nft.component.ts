// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';

// rxjs
import { from, Subject } from 'rxjs';
import { delay, takeUntil,tap } from 'rxjs/operators';

// misc
import { ENV } from '@environment/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WMLField } from '@shared/wml-components/wml-fields/wml-fields.component';
import { WMLForm } from '@shared/wml-components/wml-form/wml-form.component';
import { WMLButton } from '@windmillcode/wml-components-base';
import { WmlDropdownComponent, WmlDropdownMeta } from '@shared/wml-components/wml-dropdown/wml-dropdown.component';
import { WmlDropdownOptionsMeta } from '@shared/wml-components/wml-dropdown/wml-dropdown-option/wml-dropdown-option.component';
import { DropdownOptionComponent, DropdownOptionMeta } from '@shared/components/dropdown-option/dropdown-option.component';


//minbase
const BN = require("bn.js");



@Component({
  selector: 'generate-nft',
  templateUrl: './generate-nft.component.html',
  styleUrls: ['./generate-nft.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class GenerateNFTComponent  {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService,
    private baseService:BaseService
  ) { }
  classPrefix = this.utilService.generateClassPrefix('GenerateNFT')  
  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub= new Subject<void>()  

  rootFormGroup = new FormGroup({
    [ENV.generateNFT.nameFieldFormControlName]: new FormControl(null,[Validators.required]),
    [ENV.generateNFT.emailFieldFormControlName]: new FormControl(null,[Validators.required,Validators.email]),
    [ENV.generateNFT.dobFieldFormControlName]: new FormControl(null,[Validators.required]),
    [ENV.generateNFT.genderFieldFormControlName]: new FormControl(null,[Validators.required]),
    [ENV.generateNFT.phoneFieldFormControlName]: new FormControl(null,[Validators.required]),
  })

  nameField = this.baseService.generateInputFormField(
    "name",
    ENV.generateNFT.nameFieldFormControlName,
    this.rootFormGroup,
    {
      required:"name is required"
    }
  )

  emailField  = this.baseService.generateInputFormField(
    "email",
    ENV.generateNFT.emailFieldFormControlName,
    this.rootFormGroup,
    {
      required:"email is required",
      email:"email must be correct format"
    }
  )

  dobField = this.baseService.generateInputFormField(
    "date of birth",
    ENV.generateNFT.dobFieldFormControlName,
    this.rootFormGroup,
    {
      required:"DOB is required",
    }
  )

  genderDropdownOptions = new WmlDropdownOptionsMeta({
    displayType:"optionFirst",
    
    display: {
      cpnt: DropdownOptionComponent,
      meta: new DropdownOptionMeta({
        title:"Select",
        subTitle:"",
        selectChevronIsPresent: true,

      }),
    },
    dropdownChild: new WmlDropdownMeta({

      options: ["Male","Female","Non-binary","Prefer Not To Answer"]
        .map((genderTitle,index0) => {
          return new WmlDropdownOptionsMeta({
            display: {
              cpnt: DropdownOptionComponent,
              meta: new DropdownOptionMeta({
                title:genderTitle,
                subTitle:"",
                style:{
                  "backgroundColor":"white",
                  color:"black"
                }
              }),
            },
            sourceValue:index0
          })
        }),
    }),
    sourceValue: 1,
    type: "select"
  })
  genderMeta = new WmlDropdownMeta({
    options: [this.genderDropdownOptions],
  })
  genderField = new WMLField({
    type: "custom",
    custom: {
      selfType: "wml-card",
      labelValue:"gender",
      fieldParentForm: this.rootFormGroup,
      fieldFormControlName: ENV.generateNFT.genderFieldFormControlName,
      fieldCustomCpnt: WmlDropdownComponent,
      fieldCustomMeta: this.genderMeta

    }
  })

  phoneField = this.baseService.generateInputFormField(
    "phone number",
    ENV.generateNFT.phoneFieldFormControlName,
    this.rootFormGroup,
    {
      required:"phone is required"
    }
  )

  fields= [this.nameField,this.emailField,this.dobField,this.genderField,this.phoneField]
  wmlForm = new WMLForm({
    fields: this.fields
  })  

  ensureConnection = ()=>{
    if(!this.baseService.nearWalletAcctInfo.walletConnection){

      this.baseService.getNearAndWalletConnection(false)
      .pipe(
      takeUntil(this.ngUnsub),
      tap(()=>{
        console.log(this.baseService.nearWalletAcctInfo)
        
      }),
      delay(5000),
      tap(()=>{
        this.createNFT()
      })
    )
    .subscribe()
    
    }
    else{
      this.createNFT()
    }
  }

  createNFT = ()=>{

    this.baseService.nearWalletAcctInfo.nftContract
    .nft_mint(
      {
        token_id: `${this.baseService.nearWalletAcctInfo.accountId}-go-team-token-${this.baseService.nearWalletAcctInfo.counter}`,
        metadata: {
          title: "My Non Fungible Team Token",
          description: "The Team Most Certainly Goes :)",
          media:
            "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif",
        },
        receiver_id: this.baseService.nearWalletAcctInfo.accountId,      
      },
      300000000000000, // attached GAS (optional)
      new BN("1000000000000000000000000")
    )
  }


  submitBtn = new WMLButton({
    value:"Create NFT",
    click:this.ensureConnection
  })




  
  ngOnInit(): void {
    // this.connectNearWalletToMintBase().subscribe()
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }  

}
