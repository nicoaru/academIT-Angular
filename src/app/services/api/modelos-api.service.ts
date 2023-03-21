import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appConfigInjector, AppConfig } from '../../config/app.config';
import { Modelo, TipoCliente } from '../../models/interfaces/entidades.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ModelosApiService {
  private urlBase:string = this.appConfig.getUrlBase();

  private httpOptions = {
    headers: new HttpHeaders({'content-type':'application/json'})
  }


  getAll():Observable<Modelo[]>{
    return this.httpClient
      .get<Modelo[]>(this.urlBase+'/modelos', this.httpOptions)
  }


  constructor(
    private httpClient:HttpClient,
    @Inject(appConfigInjector) private appConfig:AppConfig
  ) { }
}
