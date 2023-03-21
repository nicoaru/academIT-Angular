import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig, appConfigInjector } from '../../config/app.config';
import { Observable } from 'rxjs';
import { TipoCliente } from '../../models/interfaces/entidades.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TiposClienteApiService {
  private urlBase:string = this.appConfig.getUrlBase();

  private httpOptions = {
    headers: new HttpHeaders({'content-type':'application/json'})
  }


  getAll():Observable<TipoCliente[]>{
    return this.httpClient
      .get<TipoCliente[]>(this.urlBase+'/tipos-cliente', this.httpOptions)
  }


  constructor(
    private httpClient:HttpClient,
    @Inject(appConfigInjector) private appConfig:AppConfig
  ) { }
}
