import { Injectable } from "@angular/core";

@Injectable()
export class PersistanceService {
    set(key: string, data: any): void {
        try {
            localStorage.setItem(key, JSON.stringify(data))
        } catch(e) {
            console.log('Error saving to localStorage', e)
        }
    }

    get(key: string): any {
        try {
            const item = localStorage.getItem(key)
            if(item) {
                return JSON.parse(item)
            } else {
                console.log('Error getting data from localStorage, value of key is null')
            }
            return
        } catch(e) {
            console.log('Error getting data from localStorage', e)
            return null
        }
    }
}