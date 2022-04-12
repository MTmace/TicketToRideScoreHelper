import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { ScoringRoutesComponent } from './scoring-routes.component'

const routes: Routes = [{ path: '', component: ScoringRoutesComponent }]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class ScoringRoutesRoutingModule {}
