import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig, appConfigInjector } from '../../config/app.config';
import { Observable } from 'rxjs';
import { Mueble } from '../../models/interfaces/entidades.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MueblesApiService {

  private urlBase:string = this.appConfig.getUrlBase();

  private httpOptions = {
    headers: new HttpHeaders({'content-type':'application/json'})
  }


  getAll():Observable<Mueble[]>{
    return this.httpClient
      .get<Mueble[]>(this.urlBase+'/muebles', this.httpOptions)
  }

  getMueblesPorIdCliente(idCliente:number):Observable<Mueble[]>{
    return this.httpClient
    .get<Mueble[]>(this.urlBase+`/clientes/${idCliente}/pedidos/muebles`, this.httpOptions)
  }

  getMueblesPorIdPedido(idPedido:number):Observable<Mueble[]>{
    return this.httpClient
    .get<Mueble[]>(this.urlBase+`/pedidos/${idPedido}/muebles`, this.httpOptions)
  }

  updateById(idMueble:number, updatedMueble:Mueble):Observable<Mueble> {
    return this.httpClient
    .put<Mueble>(this.urlBase+'/muebles/'+idMueble, updatedMueble, this.httpOptions)
  }
  
  save(nuevoMueble:Mueble):Observable<Mueble> {
    return this.httpClient
    .post<Mueble>(this.urlBase+'/muebles/', nuevoMueble, this.httpOptions)
  }

  deleteById(idMueble:number):Observable<Mueble> {
    return this.httpClient
    .delete<Mueble>(this.urlBase+'/muebles/'+idMueble, this.httpOptions)
  }
  
  


  constructor(
    private httpClient:HttpClient,
    @Inject(appConfigInjector) private appConfig:AppConfig
  ) { }

}
