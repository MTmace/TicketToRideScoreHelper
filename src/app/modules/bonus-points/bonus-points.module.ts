import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

import { InputBonusPointsModule } from '~/app/modules/bonus-points/input-bonus-points/input-bonus-points.module'
import { ModuleActionBarModule } from '~/app/shared-modules/module-action-bar/module-action-bar.module'

import { BonusPointsRoutingModule } from './bonus-points-routing.module'
import { BonusPointsComponent } from './bonus-points.component'

@NgModule({
  imports: [
    NativeScriptCommonModule, 
    BonusPointsRoutingModule,
    InputBonusPointsModule,
    ModuleActionBarModule],
  declarations: [BonusPointsComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class BonusPointsModule {}
