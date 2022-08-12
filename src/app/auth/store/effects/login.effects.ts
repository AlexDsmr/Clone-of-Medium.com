import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, of, tap } from "rxjs";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { PersistanceService } from "src/app/shared/types/services/persistance.service";
import { AuthService } from "../../services/auth.service";
import { loginAction, loginSuccessAction, loginFailureAction } from "../action/login.action";


@Injectable()
export class LoginEffect {
    login$ = createEffect(() => this.actions$.pipe(
        ofType(loginAction),
        switchMap(({request}) => {
            return this.authService.login(request).pipe(
                map((currentUser: CurrentUserInterface) => {
                    this.persistanceService.set('accessToken', currentUser.token)
                    return loginSuccessAction({currentUser})
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(
                        loginFailureAction({errors: errorResponse.error.errors})
                    )
                })
            )
        })
    ))

    redirectAfterSubmit$ = createEffect(() => this.actions$.pipe(
            ofType(loginSuccessAction),
            tap(() => {
                this.router.navigateByUrl('/')
             })
        ),
        {dispatch: false}
    )

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private persistanceService: PersistanceService,
        private router: Router    
    ) {}
}