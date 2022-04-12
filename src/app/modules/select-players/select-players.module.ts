import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

import { SelectPlayersRoutingModule } from './select-players-routing.module'
import { SelectPlayersComponent } from './select-players.component'

// app
import { ModuleActionBarModule } from '~/app/shared-modules/module-action-bar/module-action-bar.module'

@NgModule({
  imports: [
    NativeScriptCommonModule, 
    SelectPlayersRoutingModule, 
    ModuleActionBarModule
  ],
  declarations: [
    SelectPlayersComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SelectPlayersModule {}
