import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule),
  },
  {
    path: 'team',
    loadChildren: () => import('./pages/team/team.module').then(m => m.TeamModule),
  },
  {
    path: 'media',
    loadChildren: () => import('./pages/media/media.module').then(m => m.MediaModule),
  },
  {
    path: 'symbols',
    loadChildren: () => import('./pages/symbols/symbols.module').then(m => m.SymbolsModule),
  }          
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
