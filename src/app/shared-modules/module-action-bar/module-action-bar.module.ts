import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

import { ModuleActionBarComponent } from './module-action-bar.component'

@NgModule({
  imports: [NativeScriptCommonModule],
  declarations: [ModuleActionBarComponent],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [ModuleActionBarComponent]
})
export class ModuleActionBarModule {}
