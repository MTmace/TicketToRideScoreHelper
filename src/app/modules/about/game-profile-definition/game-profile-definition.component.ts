import { Component, Input, OnInit } from "@angular/core";
import { GameProfile } from "~/app/models/game-profile";

@Component({
    selector: "mt-game-profile-definition",
    moduleId: module.id,
    templateUrl: "./game-profile-definition.component.html",
    styleUrls: ["./game-profile-definition.component.css"]
})

export class GameProfileDefinitionComponent {
    @Input() gameProfile: GameProfile;
    @Input() isEven = true;

    constructor() {
    }
}
