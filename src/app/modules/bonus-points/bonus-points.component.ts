import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { Observable } from 'rxjs'

import { CurrentGameService } from '~/app/services/current-game.service'
import { PlayerScoreCard } from '~/app/models/player-score-card'
import { GameProfile } from '~/app/models/game-profile'

@Component({
  selector: 'mt-bonus-points',
  templateUrl: './bonus-points.component.html',
  styleUrls: ['./bonus-points.component.css']
})

export class BonusPointsComponent {
  public playerScoreCards$: Observable<Array<PlayerScoreCard>>;
  public currentGameProfile$: Observable<GameProfile>;

  constructor(
    public currentGameService: CurrentGameService,
  ) {
    this.playerScoreCards$ = this.currentGameService.playerScoreCards$;
    this.currentGameProfile$ = this.currentGameService.gameProfile$;
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
}
