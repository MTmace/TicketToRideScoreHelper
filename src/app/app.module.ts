import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

// app
import { ModuleActionBarModule } from '~/app/shared-modules/module-action-bar/module-action-bar.module'
import { SideDrawerModule } from '~/app/shared-modules/side-drawer/side-drawer.module'

@NgModule({
  bootstrap: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule, 
    NativeScriptModule, 
    NativeScriptUISideDrawerModule,
  
    ModuleActionBarModule,
    SideDrawerModule
  ],
  declarations: [
    AppComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
