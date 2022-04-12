import { Component } from '@angular/core'
import { Application } from '@nativescript/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Observable } from 'rxjs'
import { GameProfile } from '~/app/models/game-profile'
import { DataService } from '~/app/services/data.service'

@Component({
  selector: 'mt-about',
  templateUrl: './about.component.html',
})
export class AboutComponent {
  gameProfiles: Observable<Array<GameProfile>>;

  constructor(
    private dataService: DataService
  ) {
    this.gameProfiles = this.dataService.gameProfiles;
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}
