import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

import { SideDrawerComponent } from './side-drawer.component'

@NgModule({
  imports: [NativeScriptCommonModule],
  declarations: [SideDrawerComponent],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [SideDrawerComponent]
})
export class SideDrawerModule {}
