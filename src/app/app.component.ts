import { Component, OnInit } from '@angular/core'
import { ActivationStart, NavigationEnd, Router } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'
import { Dialogs, SwipeDirection, SwipeGestureEventData } from '@nativescript/core';

import {
  DrawerTransitionBase,
  RadSideDrawer,
  SlideInOnTopTransition,
} from 'nativescript-ui-sidedrawer'
import { filter } from 'rxjs/operators'
import { Application } from '@nativescript/core'
import { ngRouteData } from './models/ng-route-data';
import { CurrentGameService } from './services/current-game.service';

@Component({
  selector: 'ns-app',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  private _activatedUrl: string
  private _sideDrawerTransition: DrawerTransitionBase
  private _routeData: ngRouteData;

  constructor(
    private router: Router, 
    private routerExtensions: RouterExtensions,
    private currentGameService: CurrentGameService) {
  }

  ngOnInit(): void {
    this._activatedUrl = '/select-players'
    this._sideDrawerTransition = new SlideInOnTopTransition()

    this.router.events.pipe(
      filter((event: any) => event instanceof ActivationStart)
    ).subscribe((route: ActivationStart) => {
      this._routeData = <ngRouteData> {
        previous: route.snapshot.data['previousRoute'],
        next: route.snapshot.data['nextRoute'],
       };
    });

    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
  }

  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition
  }

  isComponentSelected(url: string): boolean {
    return this._activatedUrl === url
  }

  onNavItemTap(navItemRoute: string): void {
    this.routerExtensions.navigate([navItemRoute], {
      transition: {
        name: 'fade',
      },
    })

    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.closeDrawer()
  }

  onSwipe(args: SwipeGestureEventData) {
    if (args.direction === SwipeDirection.right && this._routeData.previous) {
      this.router.navigate([`/${this._routeData.previous}`]);
      return;
    }
    
    if (args.direction === SwipeDirection.left) {
      if (this._routeData.next) {
        this.router.navigate([`/${this._routeData.next}`]);
        return
      }

      // End of workflow, prompt for new game
      this.displayConfirmDialog();
    }
  }

  displayConfirmDialog() {
    // >> confirm-dialog-code
    let options = {
        title: "Game in Progress",
        message: "You have a game in progress, would you like to start a new game?",
        okButtonText: "YES",
        cancelButtonText: "Cancel",
    };

    Dialogs.confirm(options).then((result: boolean) => {
        if (result) {
          this.currentGameService.newGame();
          this.router.navigate(["/"]);
        }
    });
  }
}

