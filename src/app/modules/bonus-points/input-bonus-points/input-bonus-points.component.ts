import { Component, OnInit, Input } from "@angular/core";
import { BonusPointsDefinition } from "~/app/models/bonus-points-definition";
import { EventData, Switch, TextField } from '@nativescript/core';
import { PlayerScoreCard } from "~/app/models/player-score-card";

@Component({
    selector: "mt-input-bonus-points",
    templateUrl: "./input-bonus-points.component.html",
})

export class InputBonusPointsComponent implements OnInit {
    @Input() bonusPointsDefinition: BonusPointsDefinition;
    @Input() playerScoreCard: PlayerScoreCard;

    playerBonusPointsDefinition: BonusPointsDefinition;
    initialInput: number;

    constructor(
    ) {
    }

    ngOnInit(): void {
        debugger;
        this.playerBonusPointsDefinition = this.playerScoreCard.bonusPointsDefinitions.find(bonusPoints => bonusPoints.name === this.bonusPointsDefinition.name)

        if (this.playerBonusPointsDefinition?.points > 0) {
            if (this.playerBonusPointsDefinition.bonusPointsBehavior === 'PointsPer') {
                this.initialInput = this.playerBonusPointsDefinition.points / this.bonusPointsDefinition.points;
            } else {
                this.initialInput = this.playerBonusPointsDefinition.points;
            }
        }
    }

    onCheckedChange(args: EventData) {
        let mySwitch = args.object as Switch;

        if (mySwitch.checked) {
            this.playerScoreCard.bonusPointsDefinitions.push(this.bonusPointsDefinition);
        } else {
            this.playerScoreCard.bonusPointsDefinitions.pop();
        }
    }

    public onTextChange(args) {
        let textField = args.object as TextField;
        let userInput = textField.text ? +textField.text : 0;

        if (this.playerBonusPointsDefinition.bonusPointsBehavior === 'PointsPer') {
            this.playerBonusPointsDefinition.points = userInput * this.bonusPointsDefinition.points;
        } else {
            this.playerBonusPointsDefinition.points = userInput;
        }
    }

}
