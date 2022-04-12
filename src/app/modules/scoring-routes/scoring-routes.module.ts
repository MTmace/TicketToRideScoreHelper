import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

import { ScoringRoutesRoutingModule } from './scoring-routes-routing.module'
import { ScoringRoutesComponent } from './scoring-routes.component'

// app
import { ModuleActionBarModule } from '~/app/shared-modules/module-action-bar/module-action-bar.module'

@NgModule({
  imports: [
    NativeScriptCommonModule, 
    ScoringRoutesRoutingModule,
    ModuleActionBarModule
  ],
  declarations: [
    ScoringRoutesComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ScoringRoutesModule {}
