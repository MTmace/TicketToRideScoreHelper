import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { BonusPointsComponent } from './bonus-points.component'

const routes: Routes = [{ path: '', component: BonusPointsComponent }]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class BonusPointsRoutingModule {}
