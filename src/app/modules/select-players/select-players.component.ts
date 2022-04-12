import { Component } from "@angular/core";
import { Application } from '@nativescript/core'
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Observable } from "rxjs";

import { GameProfile } from "~/app/models/game-profile";
import { PlayerScoreCard } from "~/app/models/player-score-card";
import { PlayerColor } from "~/app/models/player-color";
import { CurrentGameService } from "~/app/services/current-game.service";

@Component({
    selector: "mt-select-players",
    templateUrl: "./select-players.component.html",
    styleUrls: ["./select-players.component.css"]
})

export class SelectPlayersComponent {
    public currentGameProfile$: Observable<GameProfile>;
    public playerScoreCards: Array<PlayerScoreCard>;

    constructor(
        public currentGameService: CurrentGameService
    ) {
        this.currentGameService.playerScoreCards$.subscribe(scoreCards => this.playerScoreCards = scoreCards);
        this.currentGameProfile$ = this.currentGameService.gameProfile$;
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView()
        sideDrawer.showDrawer()
    }

    selectPlayerColor(selectedPlayerColor: PlayerColor): void {
        this.currentGameService.togglePlayerScoreCard(selectedPlayerColor);
    }

    isColorSelected(selectedPlayerColor: string) : boolean {
        return !this.playerScoreCards.some(x => x.playerColor.name === selectedPlayerColor);
    }
}
