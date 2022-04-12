import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { SelectPlayersComponent } from './select-players.component'

const routes: Routes = [{ path: '', component: SelectPlayersComponent }]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class SelectPlayersRoutingModule {}
