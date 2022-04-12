import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

import { InputBonusPointsComponent } from './input-bonus-points.component'

@NgModule({
  imports: [NativeScriptCommonModule],
  declarations: [InputBonusPointsComponent],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [InputBonusPointsComponent]
})
export class InputBonusPointsModule {}
