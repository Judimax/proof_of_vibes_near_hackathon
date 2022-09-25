import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateNFTComponent } from './pages/generate-nft/generate-nft.component';
import { VibesmapComponent } from './pages/vibesmap/vibesmap.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule),
  },

  {
    path:'generateNFT',
    component:GenerateNFTComponent
  },
  {
    path:'vibesmap',
    component:VibesmapComponent
  }          
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
