import { InjectionToken } from '@angular/core';

export const appConfigInjector = new InjectionToken<AppConfig>('app.config');

export class AppConfig {
    //static URL_BASE:string = "http://localhost:8080/JavaServer-1.0-SNAPSHOT/api"

    static URL_BASE:string = "http://localhost:4000/api"
                              
    getUrlBase():string {
        return AppConfig.URL_BASE;
    }
    constructor() {}

}

