import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appConfigInjector, AppConfig } from 'src/app/config/app.config';
import { User } from 'src/app/models/classes/classes';
import { UserFromRequest } from 'src/app/models/interfaces/userFromRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionApiService {
  private urlBase:string = this.appConfig.getUrlBase();
  private httpOptions = {
    headers: new HttpHeaders({'content-type':'application/json'})
  }

  //** Constructor **//
  //** Constructor **//
  constructor(
    private httpClient:HttpClient,
    @Inject(appConfigInjector) private appConfig:AppConfig
  ) {}
  

  //** Métodos **//
  //** Métodos **//

  login(userFromRequest:UserFromRequest):Observable<User> {
    return this.httpClient
      .post<User>(this.urlBase+'/sessions', userFromRequest,this.httpOptions)
  }
}
