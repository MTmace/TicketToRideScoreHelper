import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Application } from "@nativescript/core";
import * as application from '@nativescript/core/application';
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { GameProfile } from "~/app/models/game-profile";
import { CurrentGameService } from "~/app/services/current-game.service";

@Component({
    selector: 'mt-module-action-bar',
    moduleId: module.id,
    templateUrl: './module-action-bar.component.html',
    styleUrls: ['./module-action-bar.component.css']
})

export class ModuleActionBarComponent implements OnInit {
    @Input() title = null;
    @Input() buttonText = 'Continue';
    @Input() route = '';
    @Input() isEnabled = true;

    @Output() onTapEmitter = new EventEmitter();
    @Output() onNavTapEmitter = new EventEmitter();
    
    isNavVisible = false;
    isItemVisible = false;

    constructor(
        public currentGameService: CurrentGameService
    ) {
    }

    ngOnInit(): void {
        // Only overwrite title if one was not provided
        if (!this.title) {
            // Create a local behavior subject from the gameProfile observable in the cache service
            this.currentGameService.gameProfile$
            .subscribe((gameProfile: GameProfile) => {
                this.title = `Ticket to Ride: ${gameProfile.name}`;
            });
        }

        if (application.ios) {
            this.isNavVisible = false;
            this.isItemVisible = true;
        } else if (application.android) {
            this.isNavVisible = true;
            this.isItemVisible = false;
        }
    }

    onTap() {
        this.onTapEmitter.emit();
    }

    onNavTap() {
        this.onNavTapEmitter.emit();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView()
        sideDrawer.showDrawer()
    }
}
