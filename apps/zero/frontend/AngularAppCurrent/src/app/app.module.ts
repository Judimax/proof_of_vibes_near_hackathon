// angular
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient } from '@angular/common/http';


// misc
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { environment as env } from '@environment/environment.dev';

// i18n
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// rxjs
import { Observable } from 'rxjs';

// ngrx
import { StoreModule } from '@ngrx/store';
import { GenerateNFTComponent } from './pages/generate-nft/generate-nft.component';
import { VibesmapComponent } from './pages/vibesmap/vibesmap.component';





if (env.production) {

  Object.entries(console)
    .forEach((x, i) => {
      let [key, val] = x
      if (typeof val === "function") {
        ((console as any)[key] as any) = () => { }
      }
    })
}



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}



function waitFori18nextToLoad(translateService: TranslateService): () => Observable<any> {
  return () => {

    return translateService.use('en')

  }

}

@NgModule({
  declarations: [
    AppComponent,
    GenerateNFTComponent,
    VibesmapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot({}, {})
  ],

  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: waitFori18nextToLoad,
      deps: [TranslateService],
      multi: true
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
