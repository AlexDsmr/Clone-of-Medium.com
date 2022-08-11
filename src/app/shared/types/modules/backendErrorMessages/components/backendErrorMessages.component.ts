import { Component, Input, OnInit } from "@angular/core";
import { BackendErrorsInterface } from "src/app/auth/types/backendErrors.interface";

@Component({
    selector: 'mc-backend-error-messages',
    templateUrl: './backendErrorMessages.component.html',
    styleUrls: ['./backendErrorMessages.component.scss']
})

export class BackendErrorMessagesComponent implements OnInit {
    @Input('backendErrors') backendErrorsProps!: BackendErrorsInterface | null

    errorMessages!: string[]

    ngOnInit(): void {
        this.getErrorMessages()        
    }

    getErrorMessages(){
        const errorProps = this.backendErrorsProps
        if(errorProps){
            this.errorMessages = Object.keys(errorProps).map((name: string) => {
                const messages = errorProps[name].join(', ')
                return `${name} ${messages}`
            })
        }
    }
}