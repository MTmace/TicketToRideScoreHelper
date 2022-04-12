import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

import { AboutRoutingModule } from './about-routing.module'
import { AboutComponent } from './about.component'

// app
import { GameProfileDefinitionComponent } from "./game-profile-definition/game-profile-definition.component";
import { ModuleActionBarModule } from '~/app/shared-modules/module-action-bar/module-action-bar.module';

@NgModule({
  imports: [
    NativeScriptCommonModule, 
    AboutRoutingModule,
    ModuleActionBarModule
  ],
  declarations: [
    AboutComponent,
    GameProfileDefinitionComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AboutModule {}
