import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, of, tap } from "rxjs";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { PersistanceService } from "src/app/shared/services/persistance.service";
import { AuthService } from "../../services/auth.service";
import { registerAction, registerFailureAction, registerSuccessAction } from "../action/register.action";

@Injectable()
export class RegisterEffect {
    register$ = createEffect(() => this.actions$.pipe(
        ofType(registerAction),
        switchMap(({request}) => {
            return this.authService.register(request).pipe(
                map((currentUser: CurrentUserInterface) => {
                    this.persistanceService.set('accessToken', currentUser.token)
                    return registerSuccessAction({currentUser})
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(
                        registerFailureAction({errors: errorResponse.error.errors})
                    )
                })
            )
        })
    ))

    redirectAfterSubmit$ = createEffect(() => this.actions$.pipe(
            ofType(registerSuccessAction),
            tap(() => {
                console.log('success')
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