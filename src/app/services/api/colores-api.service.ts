import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig, appConfigInjector } from '../../config/app.config';
import { Observable } from 'rxjs';
import { Cliente, Color } from '../../models/interfaces/entidades.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ColoresApiService {

  private urlBase:string = this.appConfig.getUrlBase();

  private httpOptions = {
    headers: new HttpHeaders({'content-type':'application/json'})
  }


  getAll():Observable<Color[]>{
    return this.httpClient
      .get<Color[]>(this.urlBase+'/colores', this.httpOptions)
  }



  constructor(
    private httpClient:HttpClient,
    @Inject(appConfigInjector) private appConfig:AppConfig
  ) { }
}
