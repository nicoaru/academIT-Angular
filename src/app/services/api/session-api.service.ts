import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appConfigInjector, AppConfig } from 'src/app/config/app.config';
import { Usuario } from 'src/app/models/interfaces/entidades.interfaces';


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

  login(userFromRequest:Usuario):Observable<Usuario> {
    return this.httpClient
      .post<Usuario>(this.urlBase+'/sessions', userFromRequest,this.httpOptions)
  }
}
