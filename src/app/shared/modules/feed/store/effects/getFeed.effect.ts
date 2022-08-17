
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, of } from "rxjs";
import { FeedService } from "../../feed.service";
import { getFeedAction, getFeedFailureAction, getFeedSuccessAction } from "../actions/getFeedAction";
import { GetFeedResponseInterface } from "../../types/getFeedResponse.interface";



@Injectable()
export class GetFeedEffect {
    getFeed$ = createEffect(() => this.actions$.pipe(
        ofType(getFeedAction),
        switchMap(({url}) => {
            return this.feedService.getFeed(url).pipe(
                map((feed: GetFeedResponseInterface) => {
                    return getFeedSuccessAction({feed})
                }),
                catchError(() => {
                    return of(
                        getFeedFailureAction()
                    )
                })
            )
        })
    ))
        

    constructor(
        private actions$: Actions,
        private feedService: FeedService
    ) {}
}