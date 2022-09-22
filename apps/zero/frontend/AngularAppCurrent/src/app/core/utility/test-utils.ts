// angular
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ChangeDetectorRef, Component, ModuleWithProviders, NO_ERRORS_SCHEMA, Provider, Type, ViewChild } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Route } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { BaseService } from "@core/base/base.service";
import { ActionReducer, Store, StoreModule } from "@ngrx/store";

// i18n
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";

export  let mockTranslateService = {
  get:()=> new Subject(),
  onTranslationChange:new Subject(),
  onLangChange:new Subject(),
  onDefaultLangChange:new Subject(),
}


@Component({
  template: `<router-outlet></router-outlet>`,
  standalone:true,
  schemas:[
    NO_ERRORS_SCHEMA
  ]
})
export class TestRootComponent {
}


export let configureTestingModuleForComponents = async (
  targetCpnt:Type<any>,
  myProviders:Partial<{
    mockTranslateService:any
    mockCdref:any,
    mockHttpClient:any,
    mockStore:any
  }> = {},
  routes:Route[] =[]
)=>{

  let providers:any = [
    
    {provide:TranslateService,useValue:myProviders.mockTranslateService},
    {provide:HttpClient,useValue:myProviders.mockHttpClient},
  ]
  if(myProviders.mockCdref){
    providers.push({
      provide:ChangeDetectorRef,useValue:myProviders.mockCdref
    })
  }
  if(myProviders.mockStore){
    providers.push({
      provide:Store,useValue:myProviders.mockStore
    })
  }
  
  let imports:any[] = [
    RouterTestingModule,
    TranslateModule,
    HttpClientModule,
  ]

  if(routes.length !== 0){
    imports.push(
      RouterTestingModule.withRoutes(routes)
    )
  }

  await TestBed.configureTestingModule({
    imports,
    declarations: [
      targetCpnt
    ],
    providers,
    schemas:[
      NO_ERRORS_SCHEMA
    ]

  }).compileComponents();

  
}

export let configureTestingModuleForServices =  (
  targetService:Function,
  providers:Partial<{
    mockTranslateService:any,
    mockHttpClient:any,
  }> = {}
)=>{
  TestBed.configureTestingModule({
    imports:[
      HttpClientModule
    ],
    providers:[
      {provide:TranslateService,useValue:providers.mockTranslateService},
      {provide:HttpClient,useValue:providers.mockHttpClient},
    ],
  })

  let service = TestBed.inject(targetService);
  return service
  
}

export let configureTestingModuleForDirectives = (
  targetDirective:Type<any>,
  myParams:Function,
  providers:Partial<{
    mockTranslateService:any,
    mockHttpClient:any,
    mockBaseService:any
  }> = {}
)=>{


  @Component({
    selector:"app-my-test",
    template:`
    <div class='myTestCpnt' [scrollBottomPagination]="params">
    `
  })
  class TestComponent {

    params=myParams()
    @ViewChild(targetDirective) myDirective;
  }

  TestBed.configureTestingModule({
    declarations:[
      targetDirective,TestComponent
    ],
    imports:[
      HttpClientModule
    ],
    providers:[
      {provide:TranslateService,useValue:providers.mockTranslateService},
      {provide:HttpClient,useValue:providers.mockHttpClient},
      {provide:BaseService,useValue:providers.mockBaseService},
    ],
  })

  let  { fixture,  cpnt } = grabComponentInstance(TestComponent)
  fixture.detectChanges();
  return { fixture,  cpnt,directive:cpnt.myDirective }

}

export function grabComponentInstance(targetCpnt: Type<any>) {
  let fixture = TestBed.createComponent(targetCpnt);
  let cpnt = fixture.componentInstance;
  return { fixture,  cpnt };
}

export class ChangeDetectorRefExtension extends ChangeDetectorRef{
  constructor(){
    super()
  }
  reattach(): void {
      
  }
  markForCheck(): void {
      
  }
  checkNoChanges(): void {
      
  }
  detectChanges(): void {
      
  }
  detach(): void {
      
  }
}