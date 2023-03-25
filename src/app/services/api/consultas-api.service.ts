import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig, appConfigInjector } from '../../config/app.config';
import { Observable } from 'rxjs';
import { Cliente } from '../../models/interfaces/entidades.interfaces';
import { Consulta } from 'src/app/models/classes/consulta.class';

@Injectable({
  providedIn: 'root'
})


export class ConsultasApiService {
  
  private urlBase:string = this.appConfig.getUrlBase();

  private httpOptions = {
    headers: new HttpHeaders({'content-type':'application/json'})
  }


  send(nuevaConsulta:Consulta):Observable<Consulta> {
    return this.httpClient
      .post<Consulta>(this.urlBase+'/consultas', nuevaConsulta, this.httpOptions) 
  }


  constructor(
    private httpClient:HttpClient,
    @Inject(appConfigInjector) private appConfig:AppConfig
  ) { }



}
