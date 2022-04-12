import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Dialogs, EventData, Switch } from '@nativescript/core';
import { ExpansionDefinition } from "~/app/models/expansion-definition";
import { RouterExtensions } from "@nativescript/angular";

import { DataService } from "~/app/services/data.service";
import { CurrentGameService } from "~/app/services/current-game.service";
import { GameProfile } from "~/app/models/game-profile";
import { PlayerScoreCard } from "~/app/models/player-score-card";

@Component({
    selector: "mt-side-drawer",
    moduleId: module.id,
    templateUrl: "./side-drawer.component.html",
    styleUrls: ["./side-drawer.component.css"]
})

export class SideDrawerComponent {
    currentGameProfile: GameProfile;
    playerScoreCards: Array<PlayerScoreCard>;

    constructor(public dataService: DataService,
        public currentGameService: CurrentGameService,
        private router: Router,
        private _routerExtensions: RouterExtensions) {

            // Subscribe to the game profile defined in the cache service, that is the selected game
            this.currentGameService.gameProfile$.subscribe((selectedGame: GameProfile) => {
                this.currentGameProfile = selectedGame;
            });
            this.currentGameService.playerScoreCards$.subscribe(scoreCards => this.playerScoreCards = scoreCards);
    }

    selectGame(changedGame: GameProfile) {

        if (this.currentGameProfile.name != changedGame.name && this.playerScoreCards.length > 0) {
            this.displayConfirmDialog(changedGame);
        } else {
            this.changeGame(changedGame);
        }

        // // Change the selected game in the cache
        // this.currentGameService.changeGame(changedGame);
    }

    displayConfirmDialog(selectedGame: GameProfile) {

        let options = {
            title: "Game in Progress",
            message: "You have a game in progress, would you like to start a new game?",
            okButtonText: "YES",
            cancelButtonText: "Cancel",
        };

        Dialogs.confirm(options).then((result: boolean) => {
            if (result) {
                this.changeGame(selectedGame);
            }
        });
    }

    changeGame(selectedGame: GameProfile) {
        // Clear game if one exists and change Game Profile
        this.currentGameService.changeGame(selectedGame);
        this.router.navigate(["/"]);
    }

    onExpansionCheckedChange(args: EventData, expansionDefinition: ExpansionDefinition) {
        let sw = args.object as Switch;

        !sw.checked ? this.removeExpansion(expansionDefinition) : this.addExpansion(expansionDefinition);
    }

    private addExpansion(expansionDefinition: ExpansionDefinition) {
        expansionDefinition.bonusPointsDefinitions.forEach(bpd => {
            // Add the definition from the game profile (we use this to build the bonus-points component)
            this.currentGameProfile.bonusPointsDefinitions.push(bpd);

            // DO NOT ADD TO THE Player's Card. We only add it if the player scores that bonus.
        });
    }

    private removeExpansion(expansionDefinition: ExpansionDefinition) {
        expansionDefinition.bonusPointsDefinitions.forEach(bpd => {
            // Remove the definition from the game profile (we use this to build the bonus-points component)
            this.currentGameProfile.bonusPointsDefinitions = this.currentGameProfile.bonusPointsDefinitions.filter(p => p != bpd);

            // Remove the expansion's bonusPointDefinitions from player cards
            this.playerScoreCards.forEach(playingCard => {
                playingCard.bonusPointsDefinitions = playingCard.bonusPointsDefinitions.filter(obj => obj != bpd);
            });
        });
    }

    public expansionIsChecked(expansionDefinition: ExpansionDefinition): boolean {
        return this.currentGameProfile.bonusPointsDefinitions.some(i => i.name === expansionDefinition.bonusPointsDefinitions[0].name);
    }

    public navigateToAbout() {
        this._routerExtensions.navigate(["/about"]);
    }
}
