import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { environment } from "src/environments/environment";
import { getFeedAction } from "../../store/actions/getFeedAction";
import { errorSelector, feedSelector, isLoadingSelector } from "../../store/selectors";
import { GetFeedResponseInterface } from "../../types/getFeedResponse.interface";
import { parseUrl, stringify } from 'query-string'

 @Component({
    selector: 'mc-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss'],
 })

 export class FeedComponent implements OnInit, OnDestroy{
   @Input('apiUrl') apiUrlprops!: string

   isLoading$!: Observable<boolean>
   error$!: Observable<string | null>
   feed$!: Observable<GetFeedResponseInterface | null>
   limit = environment.limit
   baseUrl!: string
   queryParamsSubscription!: Subscription
   currentPage!: number

   constructor(private store: Store, private router: Router, private route: ActivatedRoute) {}


   ngOnInit(): void {
      this.initializeValues()
      this.initializeListeners()
   }

   ngOnDestroy(): void {
      this.queryParamsSubscription.unsubscribe()
   }

   initializeValues(): void {
      this.isLoading$ = this.store.pipe(select(isLoadingSelector))
      this.error$ = this.store.pipe(select(errorSelector))
      this.feed$ = this.store.pipe(select(feedSelector))
      this.baseUrl = this.router.url.split('?')[0]
   }

   initializeListeners(): void {
      this.queryParamsSubscription = this.route.queryParams.subscribe((params: Params) => {
         this.currentPage = Number(params["page"] || '1')
         this.fetchFeed()
      })
   }

   fetchFeed() {
    const offset = this.currentPage * this.limit - this.limit
    const parsedUrl = parseUrl(this.apiUrlprops)
    const stringifyedParams = stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query
    })
    const apiUrlWithParams = `${parsedUrl.url}?${stringifyedParams}`
    this.store.dispatch(getFeedAction({url: apiUrlWithParams}))
   }
 }
