import { Component, OnInit } from '@angular/core'
import { Application, TouchGestureEventData } from '@nativescript/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { BehaviorSubject, Observable } from 'rxjs';
import { GameProfile } from '~/app/models/game-profile';
import { PlayerScoreCard } from '~/app/models/player-score-card';
import { RouteLengthPointsDefinition } from '~/app/models/route-length-points-definition';
import { CurrentGameService } from '~/app/services/current-game.service';
import { DataService } from '~/app/services/data.service';

@Component({
  selector: 'mt-scoring-routes',
  templateUrl: './scoring-routes.component.html',
  styleUrls: ["./scoring-routes.component.css"]
})
export class ScoringRoutesComponent {
  public playerScoreCards$: Observable<Array<PlayerScoreCard>>;
  public currentGameProfile$: Observable<GameProfile>;
  
  // Tap and long press are both triggered with long press. So we need to handle 1 event 'onTouch'
  // then we determine if the touch event is a tap or long press
  private start: number;
  private end: number;

  constructor(
    public currentGameService: CurrentGameService,
    public dataService: DataService
  ) {
    this.playerScoreCards$ = this.currentGameService.playerScoreCards$;
    this.currentGameProfile$ = this.currentGameService.gameProfile$;
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

  onTouch(args: TouchGestureEventData, routeLengthPoints: RouteLengthPointsDefinition, playerScoreCard: PlayerScoreCard) {
    if(args.action === "down") {
        this.start = new Date().getMilliseconds();
    }

    if(args.action === "up") {
        this.end = new Date().getMilliseconds();
        const duration = Math.abs(this.start - this.end)

        duration > 200 ? this.removeRouteFromCard(routeLengthPoints, playerScoreCard) : this.addRouteToCard(routeLengthPoints, playerScoreCard);
    }
  }

  // TODO: move to service
  // TODO: add unit testing here
  addRouteToCard(routeLengthPoints: RouteLengthPointsDefinition, playerScoreCard: PlayerScoreCard) {
    // check to see if the route has been added to the score card
    var routeCount = playerScoreCard.routeLengthPointsCount.find(x => x[1].length === routeLengthPoints.length);

    if (!routeCount) {
        // not route was found, so add it
        playerScoreCard.routeLengthPointsCount.push([1, routeLengthPoints]);
    } else {
        // TODO: the limit should be per game and not per person. Need to validate limit against all players
        // If the routeCounts have not reached their limits then add it to the ScoreCard
        if (!routeCount[1].limit || routeCount[0] < routeCount[1].limit) {
            routeCount[0] = routeCount[0] + 1;
        }
    }
  }

  getRouteLengthPoints(routeLengthPoints: RouteLengthPointsDefinition, playerScoreCard: PlayerScoreCard): number {
    // check to see if the route has been added to the score card
    const routeCount = playerScoreCard.routeLengthPointsCount.find(x => x[1].length === routeLengthPoints.length);
    var count = 0;

    return routeCount ? routeCount[0] : count;
  }

  // TODO: move to service
  removeRouteFromCard(routeLengthPoints: RouteLengthPointsDefinition, playerScoreCard: PlayerScoreCard) {
    // check to see if the route has been added to the score card
    var routeCount = playerScoreCard.routeLengthPointsCount.find(x => x[1].length === routeLengthPoints.length);

    if (routeCount && routeCount[0] > 0 ) {
        routeCount[0] = routeCount[0] - 1;
    }
  }

}
