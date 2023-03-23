import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig, appConfigInjector } from '../../config/app.config';
import { Observable } from 'rxjs';
import { Cliente } from '../../models/interfaces/entidades.interfaces';

@Injectable({
  providedIn: 'root'
})


export class ClientesApiService {
  
  private urlBase:string = this.appConfig.getUrlBase();

  private httpOptions = {
    headers: new HttpHeaders({'content-type':'application/json'})
  }


  getAll():Observable<Cliente[]>{
    return this.httpClient
      .get<Cliente[]>(this.urlBase+'/clientes', this.httpOptions)
  }

  getList():Observable<Cliente[]>{
    return this.httpClient
      .get<Cliente[]>(this.urlBase+'/clientes/list', this.httpOptions)
  }

  getById(idCliente:number):Observable<Cliente>{
    return this.httpClient
      .get<Cliente>(this.urlBase+'/clientes/'+idCliente, this.httpOptions)
  }

  updateById(idCliente:number, updatedCliente:Cliente):Observable<Cliente> {
    return this.httpClient
      .put<Cliente>(this.urlBase+'/clientes/'+idCliente, updatedCliente, this.httpOptions, )
  }

  save(nuevoCliente:Cliente):Observable<Cliente> {
    return this.httpClient
      .post<Cliente>(this.urlBase+'/clientes', nuevoCliente, this.httpOptions) 
  }
  
  deleteById(idCliente:number):Observable<Cliente> {
    return this.httpClient
      .delete<Cliente>(this.urlBase+'/clientes/'+idCliente, this.httpOptions) 
  }
  


  constructor(
    private httpClient:HttpClient,
    @Inject(appConfigInjector) private appConfig:AppConfig
  ) { }



}
