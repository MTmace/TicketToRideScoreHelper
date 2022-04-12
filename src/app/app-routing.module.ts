import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/select-players', 
    pathMatch: 'full'
  },
  { 
    path: 'select-players', 
    loadChildren: () => import('~/app/modules/select-players/select-players.module').then((m) => m.SelectPlayersModule),
    data: { 
      previousRoute: null,
      nextRoute: 'scoring-routes'
     }
  },
  { 
    path: 'scoring-routes', 
    loadChildren: () => import('~/app/modules/scoring-routes/scoring-routes.module').then((m) => m.ScoringRoutesModule),
    data: { 
      previousRoute: 'select-players',
      nextRoute: 'bonus-points'
     }
  },
  { 
    path: 'bonus-points', 
    loadChildren: () => import('~/app/modules/bonus-points/bonus-points.module').then((m) => m.BonusPointsModule),
    data: { 
      previousRoute: 'scoring-routes',
      nextRoute: null
     }
  },
  {
    path: 'about',
    loadChildren: () => import('~/app/modules/about/about.module').then((m) => m.AboutModule),
  },
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
