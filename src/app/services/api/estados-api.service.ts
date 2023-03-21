import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appConfigInjector, AppConfig } from '../../config/app.config';
import { Estado, TipoCliente } from '../../models/interfaces/entidades.interfaces';

@Injectable({
  providedIn: 'root'
})
export class EstadosApiService {
  private urlBase:string = this.appConfig.getUrlBase();

  private httpOptions = {
    headers: new HttpHeaders({'content-type':'application/json'})
  }


  getAll():Observable<Estado[]>{
    return this.httpClient
      .get<Estado[]>(this.urlBase+'/estados', this.httpOptions)
  }


  constructor(
    private httpClient:HttpClient,
    @Inject(appConfigInjector) private appConfig:AppConfig
  ) { }
}
